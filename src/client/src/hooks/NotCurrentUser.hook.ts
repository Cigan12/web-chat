import { GetChatsQuery, useGetUserQuery } from 'generated/graphql.types';

export const useNotCurrentUser = (
    users?: GetChatsQuery['chats'][number]['users'],
) => {
    const { data: user } = useGetUserQuery();

    return users?.find((item) => item.id !== user?.getUser.id);
};
