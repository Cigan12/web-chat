import { makeVar } from '@apollo/client';

export const isAuthenticatedVar = makeVar<boolean>(false);
