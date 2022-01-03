import React, { useEffect, useMemo } from 'react';
import {
    FindUsersQuery,
    GetChatsQuery,
    NewMessagesDocument,
    NewMessagesSubscription,
    useGetPrivateChatQuery,
    useSendMessageMutation,
} from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import { useNotCurrentUser } from 'hooks/NotCurrentUser.hook';

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

    return (
        <div>
            {contact?.username}
            <div>
                {data?.privateChat?.messages.map((message) => (
                    <p key={message.id}>
                        {message.message} {message.date}
                    </p>
                ))}
            </div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Message"
                    {...register('message')}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
