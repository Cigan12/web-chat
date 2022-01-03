import React, { useEffect, useState } from 'react';
import {
    FindUsersQuery,
    GetChatsQuery,
    NewChatCreatedDocument,
    NewChatCreatedSubscription,
    useFindUsersQuery,
    useGetChatsQuery,
    useGetUserQuery,
} from 'generated/graphql.types';
import { UserCard } from 'components/cards/UserCard/UserCard.component';
import { ChatComponent } from 'components/modules/Chat/Chat.component';
import { ChatCardComponent } from 'components/cards/ChatCard/ChatCard.component';
import { StyledMainLayout, StyledMainView } from './Main.styled';
import { version } from '../../../package.json';

interface ISubscriptionData {
    subscriptionData: {
        data?: NewChatCreatedSubscription;
    };
}

export const MainView: React.FC = () => {
    // CURRENT USER
    const { data: currentUser } = useGetUserQuery();

    // QUERIES
    const { data: chats, subscribeToMore } = useGetChatsQuery();
    const { data: users, refetch } = useFindUsersQuery();

    useEffect(() => {
        subscribeToMore({
            document: NewChatCreatedDocument,
            updateQuery: (prev, { subscriptionData }: ISubscriptionData) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newChat = subscriptionData.data.newChatCreated;

                return {
                    ...prev,
                    chats: prev.chats.concat([newChat]),
                };
            },
        });
    }, []);

    // SETTING A USER ACTIVE TO DISPLAY A CHAT WITH HIM
    const [activeUser, setActiveUser] = useState<
        FindUsersQuery['findUsers'][number] | null
    >(null);

    const handleSetActiveUser = (user: FindUsersQuery['findUsers'][number]) => {
        setActiveUser(user);
    };

    // SETTING A CHAT ACTIVE TO DISPLAY A CHAT FOR IT
    const [activeChat, setActiveChat] = useState<
        GetChatsQuery['chats'][number] | null
    >(null);

    const handleSetActiveChat = (chat: GetChatsQuery['chats'][number]) => {
        setActiveChat(chat);
    };

    // SEARCH FOR CONTACTS
    const [searchUser, setSearchUser] = useState('');

    const handleSearchUsers: React.ChangeEventHandler<HTMLInputElement> =
        async (e) => {
            setSearchUser(e.target.value);
            await refetch({
                username: e.target.value,
            });
        };

    return (
        <StyledMainView>
            <p> Web chat: {version}</p>
            <h3>{currentUser?.getUser.username}</h3>
            <input
                type="text"
                placeholder="search friends"
                value={searchUser}
                onChange={handleSearchUsers}
            />
            <StyledMainLayout>
                <aside>
                    {searchUser &&
                        users?.findUsers.map((user) => (
                            <UserCard
                                username={user.username}
                                key={user.id}
                                active={user.id === activeUser?.id}
                                onClick={() => handleSetActiveUser(user)}
                            />
                        ))}
                    {!searchUser &&
                        chats?.chats.map((chat) => (
                            <ChatCardComponent
                                chat={chat}
                                key={chat.id}
                                active={activeChat?.id === chat.id}
                                onClick={() => handleSetActiveChat(chat)}
                            />
                        ))}
                </aside>
                <section>
                    {activeUser || activeChat ? (
                        <ChatComponent
                            activeUser={activeUser}
                            activeChat={activeChat}
                        />
                    ) : (
                        'Nothing here yet'
                    )}
                </section>
            </StyledMainLayout>
        </StyledMainView>
    );
};
