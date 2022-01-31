import React, { useEffect, useState } from 'react';
import {
    ChatUpdatedDocument,
    GetChatsQuery,
    NewChatCreatedDocument,
    NewChatCreatedSubscription,
    useGetChatsLazyQuery,
    useGetUserLazyQuery,
} from 'generated/graphql.types';
import { IUserCardMessage } from 'components/cards/UserCard/UserCard.component';
import { ChatComponent } from 'components/modules/Chat/Chat.component';
import { useHandleErrors } from 'hooks/errors/HandleErrors.hook';
import { Input } from 'components/forms/Input/Input.component';
import SearchIcon from 'assets/small/search.svg';
import { IMenuItem, Menu } from 'components/ui/Menu/Menu.component';
import ExitIcon from 'assets/small/exit.svg';
import { checkIsTokenExpired } from 'utils/helpers/SmallHelpers/tokenValidation.helper';
import { useAuthModals } from 'components/providers/AuthModals/AuthModals.provider';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import { isAuthenticatedVar } from 'components/providers/Apollo/ApolloVariables.helper';
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
    const isAuth = useReactiveVar(isAuthenticatedVar);
    // APOLLO CLIENT
    const client = useApolloClient();
    // MODALS
    const { openSignInModal } = useAuthModals();

    // QUERIES
    // CURRENT USER
    const [getUser, { data: currentUser, error: getUserError }] =
        useGetUserLazyQuery();

    const getUserErrors = getUserError?.graphQLErrors || [];

    // USER CHATS
    const [
        getChats,
        {
            data: chats,
            subscribeToMore,
            error: getChatsError,
            refetch: refetchChats,
        },
    ] = useGetChatsLazyQuery();

    const getChatsErrors = getChatsError?.graphQLErrors || [];

    useHandleErrors([...getUserErrors, ...getChatsErrors]);

    useEffect(() => {
        const refresh = localStorage.getItem('refresh_token');

        if (isAuth) {
            getChats();
            getUser();
        }

        if (!refresh || checkIsTokenExpired(refresh)) {
            openSignInModal();
        } else {
            isAuthenticatedVar(true);
        }
    }, [isAuth]);

    useEffect(() => {
        if (subscribeToMore && isAuth) {
            subscribeToMore({
                document: NewChatCreatedDocument,
                updateQuery: (
                    prev,
                    { subscriptionData }: ISubscriptionData,
                ) => {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const newChat = subscriptionData.data.newChatCreated;
                    const prevChats = [...prev.chats];
                    const unexistingChatIndex = prevChats.findIndex(
                        (chat) => chat.name === newChat.name,
                    );
                    if (unexistingChatIndex > -1) {
                        prevChats.splice(unexistingChatIndex, 1, newChat);
                        return {
                            ...prev,
                            chats: prevChats,
                        };
                    }
                    return {
                        ...prev,
                        chats: prevChats.concat([newChat]),
                    };
                },
            });
        }
    }, [subscribeToMore, isAuth]);

    useEffect(() => {
        if (subscribeToMore && isAuth) {
            subscribeToMore({
                document: ChatUpdatedDocument,
                updateQuery: (
                    prev,
                    { subscriptionData }: ISubscriptionData,
                ) => {
                    const prevChats = [...prev.chats];
                    const updatedChatIndex = prevChats.findIndex(
                        (chat) =>
                            chat?.id ===
                            subscriptionData.data?.newChatCreated?.id,
                    );
                    if (
                        updatedChatIndex > -1 &&
                        subscriptionData.data?.newChatCreated
                    ) {
                        prevChats.splice(
                            updatedChatIndex,
                            1,
                            subscriptionData.data?.newChatCreated,
                        );
                    }
                    return {
                        ...prev,
                        chats: prevChats,
                    };
                },
            });
        }
    }, [subscribeToMore, isAuth]);

    // SETTING A CHAT ACTIVE TO DISPLAY A CHAT FOR IT
    const [activeChat, setActiveChat] = useState<number | null>(null);

    const handleSetActiveChat = (index: number) => {
        setActiveChat(index);
    };

    // SEARCH FOR CONTACTS
    const [searchUser, setSearchUser] = useState('');

    const handleSearchUsers: React.ChangeEventHandler<HTMLInputElement> =
        async (e) => {
            setSearchUser(e.target.value);
            refetchChats?.({ search: e.target.value });
        };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        client.clearStore();
        client.resetStore();
        isAuthenticatedVar(false);
        openSignInModal();
    };

    // MENU STRUCTURE
    const menuStructure: Array<IMenuItem> = [
        {
            alt: 'exit icon',
            iconSrc: ExitIcon,
            onClick: handleLogout,
            text: 'Выйти',
        },
    ];

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
                    {chats?.chats.map((chat, index) => (
                        <StyledChatCard
                            key={chat.name}
                            username={chat.name}
                            active={activeChat === index}
                            onClick={() => handleSetActiveChat(index)}
                            message={
                                chat.messages.length
                                    ? generateMessage(
                                          chat.messages[
                                              chat.messages.length - 1
                                          ],
                                      )
                                    : undefined
                            }
                        />
                    ))}
                </StyledMainAside>
                <section>
                    <ChatComponent
                        activeChat={
                            activeChat !== null
                                ? chats?.chats[activeChat]
                                : null
                        }
                    />
                </section>
            </StyledMainLayout>
        </StyledMainView>
    );
};
