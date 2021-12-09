import React from 'react';
import { Link } from 'react-router-dom';
import { LSignUpView } from './SignUp.view.logic';

export const SignUpView: React.FC = () => {
    const { onSubmit, register } = LSignUpView();

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Sign up</legend>
                    <input
                        type="text"
                        placeholder="Nickname"
                        {...register('username')}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email')}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        {...register('password')}
                    />
                    <button type="submit">Sign up</button>
                </fieldset>
            </form>
            <Link to="/signin">sign in</Link>
        </div>
    );
};
