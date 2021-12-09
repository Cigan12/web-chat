import { useApolloClient } from '@apollo/client';
import React from 'react';
import { LSignUpView } from './SignUp.view.logic';

export const SignUpView: React.FC = () => {
    const { onSubmit, register } = LSignUpView();

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nickname"
                    {...register('username')}
                />
                <input type="text" placeholder="Email" {...register('email')} />
                <input
                    type="text"
                    placeholder="password"
                    {...register('password')}
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};
