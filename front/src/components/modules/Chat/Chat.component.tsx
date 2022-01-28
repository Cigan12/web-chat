import React, { useEffect, useRef } from 'react';
import {
    GetChatsQuery,
    GetPrivateChatQuery,
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
    activeChat?: GetChatsQuery['chats'][number] | null;
}

interface IChatFormFields {
    message: string;
}

export const ChatComponent: React.FC<IChatComponentProps> = ({
    activeChat,
}) => {
    const chatUsers = activeChat?.users;
    const chatRef = useRef<HTMLDivElement>(null);
    // CURRENT USER
    const { data: currentUser, error: getUserError } = useGetUserQuery();
    const notCurrentUser = useNotCurrentUser(chatUsers);

    useEffect(() => {
        const newMessageUserId =
            activeChat &&
            activeChat.messages[activeChat.messages.length - 1]?.user.id;

        if (newMessageUserId) {
            chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
        }
    }, [activeChat?.messages]);

    // MESSAGE SENDING STUFF
    const [sendMessage] = useSendMessageMutation();

    const { register, handleSubmit, reset } = useForm<IChatFormFields>();

    const onSubmit = handleSubmit(async (values) => {
        console.log(
            '🚀 ~ file: Chat.component.tsx ~ line 62 ~ onSubmit ~ activeChat?.id',
            activeChat,
        );
        await sendMessage({
            variables: {
                input: {
                    message: values.message,
                    chatId: activeChat?.id,
                    contactId: notCurrentUser?.id,
                },
            },
        });
        reset();
    });

    const isMessageOwner = (
        message: NonNullable<
            GetPrivateChatQuery['privateChat']
        >['messages'][number],
    ) => {
        return currentUser?.getUser.id === message?.user?.id;
    };

    return (
        <StyledChat>
            <StyledChatTopBar>
                <StyledChatName>{activeChat?.name}</StyledChatName>
            </StyledChatTopBar>
            <StyledChatContent ref={chatRef}>
                {activeChat?.messages.map((message) => (
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
