import React, { useEffect, useMemo, useRef } from 'react';
import {
    FindUsersQuery,
    GetChatsQuery,
    GetPrivateChatQuery,
    NewMessagesDocument,
    NewMessagesSubscription,
    useGetPrivateChatQuery,
    useGetUserQuery,
    useSendMessageMutation,
} from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import { useNotCurrentUser } from 'hooks/NotCurrentUser.hook';

import {
    StyledChat,
    StyledChatContent,
    StyledChatInput,
    StyledChatInputContainer,
    StyledChatInputTelegramIcon,
    StyledChatMessage,
    StyledChatName,
    StyledChatTopBar,
} from './Chat.component.styled';

interface IChatComponentProps {
    activeUser: FindUsersQuery['findUsers'][number] | null;
    activeChat: GetChatsQuery['chats'][number] | null;
}

interface IChatFormFields {
    message: string;
}

interface ISubscriptionData {
    subscriptionData: {
        data?: NewMessagesSubscription;
    };
}

export const ChatComponent: React.FC<IChatComponentProps> = ({
    activeUser,
    activeChat,
}) => {
    const chatUsers = activeChat?.users;
    const chatRef = useRef<HTMLDivElement>(null);
    // CURRENT USER
    const { data: currentUser, error: getUserError } = useGetUserQuery();
    const notCurrentUser = useNotCurrentUser(chatUsers);

    const contact = useMemo(() => {
        if (activeChat) {
            return notCurrentUser;
        }
        return activeUser;
    }, [activeChat, activeUser, notCurrentUser]);

    // SUBSCRIPTION FOR NEW MESSAGES
    const {
        data,
        subscribeToMore,
        refetch: refectchPrivateChat,
    } = useGetPrivateChatQuery({
        variables: {
            contactId: contact?.id || 0,
        },
    });

    useEffect(() => {
        subscribeToMore({
            document: NewMessagesDocument,
            updateQuery: (prev, { subscriptionData }: ISubscriptionData) => {
                if (!subscriptionData.data) return prev;

                const newMessage = subscriptionData.data.messageSent;

                if (prev.privateChat) {
                    return {
                        ...prev,
                        privateChat: {
                            ...prev.privateChat,
                            messages: prev.privateChat?.messages.concat([
                                newMessage,
                            ]),
                        },
                    };
                }
                return prev;
            },
        });
    }, []);

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
    }, [data?.privateChat?.messages]);

    // MESSAGE SENDING STUFF
    const [sendMessage] = useSendMessageMutation();

    const { register, handleSubmit, reset } = useForm<IChatFormFields>();

    const onSubmit = handleSubmit(async (values) => {
        await sendMessage({
            variables: {
                input: {
                    message: values.message,
                    chatId: activeChat?.id,
                    contactId: activeUser?.id,
                },
            },
        });
        if (!activeChat) {
            await refectchPrivateChat();
        }
        reset();
    });

    const isMessageOwner = (
        message: NonNullable<
            GetPrivateChatQuery['privateChat']
        >['messages'][number],
    ) => {
        return currentUser?.getUser.id === message.user.id;
    };

    return (
        <StyledChat>
            <StyledChatTopBar>
                <StyledChatName>{contact?.username}</StyledChatName>
            </StyledChatTopBar>
            <StyledChatContent ref={chatRef}>
                {data?.privateChat?.messages.map((message) => (
                    <StyledChatMessage
                        key={message.id}
                        date={new Date(Number(message.date))}
                        message={message.message}
                        isOwner={isMessageOwner(message)}
                    />
                ))}
            </StyledChatContent>
            <form onSubmit={onSubmit}>
                <StyledChatInputContainer>
                    <StyledChatInput
                        autoComplete="off"
                        type="text"
                        placeholder="Написать сообщение"
                        {...register('message')}
                    />
                    <StyledChatInputTelegramIcon onClick={onSubmit} />
                </StyledChatInputContainer>
            </form>
        </StyledChat>
    );
};
