import React, { useState } from 'react';
import {
    useFindUsersQuery,
    useGetChatsQuery,
    useNewMessagesSubscription,
} from 'generated/graphql.types';
import { StyledMainView } from './Main.styled';
import { version } from '../../../package.json';

export const MainView: React.FC = () => {
    const { data } = useGetChatsQuery();
    const { data: messages } = useNewMessagesSubscription();
    const { data: users, refetch } = useFindUsersQuery();
    const handleSearchUsers: React.ChangeEventHandler<HTMLInputElement> =
        async (e) => {
            await refetch({
                username: e.target.value,
            });
        };

    return (
        <StyledMainView>
            <p> Web chat: {version}</p>
            <pre>{JSON.stringify(data)}</pre>
            <pre>{JSON.stringify(messages?.messageSent)}</pre>
            <input
                type="text"
                placeholder="search friends"
                onChange={handleSearchUsers}
            />
            <pre>{JSON.stringify(users?.findUsers)}</pre>
        </StyledMainView>
    );
};
