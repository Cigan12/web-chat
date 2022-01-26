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
import {
    IUserCardMessage,
    UserCard,
} from 'components/cards/UserCard/UserCard.component';
import { ChatComponent } from 'components/modules/Chat/Chat.component';
import { useHandleErrors } from 'hooks/errors/HandleErrors.hook';
import { Input } from 'components/forms/Input/Input.component';
import SearchIcon from 'assets/small/search.svg';
import { IMenuItem, Menu } from 'components/ui/Menu/Menu.component';
import ExitIcon from 'assets/small/exit.svg';
import {
    StyledChatCard,
    StyledMainAside,
    StyledMainAsideTopbar,
    StyledMainLayout,
    StyledMainView,
} from './Main.styled';

interface ISubscriptionData {
    subscriptionData: {
        data?: NewChatCreatedSubscription;
    };
}

export const MainView: React.FC = () => {
    // CURRENT USER
    const { data: currentUser, error: getUserError } = useGetUserQuery();

    const getUserErrors = getUserError?.graphQLErrors || [];

    // QUERIES
    const {
        data: chats,
        subscribeToMore,
        error: getChatsError,
    } = useGetChatsQuery();

    const getChatsErrors = getChatsError?.graphQLErrors || [];

    const { data: users, refetch, error: findUsersError } = useFindUsersQuery();

    const findUserErrors = findUsersError?.graphQLErrors || [];

    useHandleErrors([...getUserErrors, ...getChatsErrors, ...findUserErrors]);

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

    // MENU STRUCTURE

    const menuStructure: Array<IMenuItem> = [
        {
            alt: 'exit icon',
            iconSrc: ExitIcon,
            onClick: () => {
                console.log('logout');
            },
            text: 'Выйти',
        },
    ];

    const computeChatName = (chat: GetChatsQuery['chats'][number]) => {
        const chatUsers = chat.users;
        const notCurrentUser = chatUsers?.find(
            (item) => item.id !== currentUser?.getUser.id,
        );
        const chatName =
            chat.type === 'PRIVATE'
                ? notCurrentUser?.username
                : 'Some chat name';
        return chatName;
    };

    const generateMessage = (
        message: GetChatsQuery['chats'][number]['messages'][number],
    ): IUserCardMessage => {
        return {
            message: message.message,
            date: new Date(Number(message.date)),
            isOwner: currentUser?.getUser.id === message.user.id,
        };
    };

    return (
        <StyledMainView>
            <StyledMainLayout>
                <StyledMainAside>
                    <StyledMainAsideTopbar>
                        <Menu menu={menuStructure} />
                        <Input
                            type="text"
                            placeholder="Поиск по чатам"
                            value={searchUser}
                            onChange={handleSearchUsers}
                            iconRight={SearchIcon}
                        />
                    </StyledMainAsideTopbar>

                    {searchUser &&
                        users?.findUsers.map((user) => (
                            <StyledChatCard
                                username={user.username}
                                key={user.id}
                                active={user.id === activeUser?.id}
                                onClick={() => handleSetActiveUser(user)}
                            />
                        ))}
                    {!searchUser &&
                        chats?.chats.map((chat) => (
                            <StyledChatCard
                                key={chat.id}
                                username={computeChatName(chat) || ''}
                                active={activeChat?.id === chat.id}
                                onClick={() => handleSetActiveChat(chat)}
                                message={generateMessage(
                                    chat.messages[chat.messages.length - 1],
                                )}
                            />
                        ))}
                </StyledMainAside>
                <section>
                    <ChatComponent
                        activeUser={activeUser}
                        activeChat={activeChat}
                    />
                </section>
            </StyledMainLayout>
        </StyledMainView>
    );
};
