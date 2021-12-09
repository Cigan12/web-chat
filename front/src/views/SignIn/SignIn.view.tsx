import React from 'react';
import { Link } from 'react-router-dom';
import { LSignInLogic } from './SignIn.logic';

export const SignInView: React.FC = () => {
    const { onSubmit, register } = LSignInLogic();
    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Sign In</legend>
                    <input
                        type="text"
                        placeholder="login"
                        {...register('login')}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        {...register('password')}
                    />
                    <button type="submit">Sign in</button>
                </fieldset>
            </form>
            <Link to="/signup">Sign up</Link>
        </div>
    );
};
