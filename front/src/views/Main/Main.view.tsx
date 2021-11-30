import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    useAddMessageMutation,
    useOnMessageAddedSubscription,
} from 'generated/graphql.types';
import { StyledMainView } from './Main.styled';
import { version } from '../../../package.json';

export const MainView: React.FC = () => {
    const { t: __, i18n } = useTranslation();
    const { data, loading } = useOnMessageAddedSubscription();
    const [addMessage, { loading: isMessageAdding }] = useAddMessageMutation();
    return (
        <StyledMainView>
            <p>
                {' '}
                {__('Шаблон версии: ')} {version}
            </p>

            <button
                onClick={() => {
                    if (i18n.language === 'en') {
                        i18n.changeLanguage('ru');
                    } else {
                        i18n.changeLanguage('en');
                    }
                }}
            >
                switch lang
            </button>
            <pre>{JSON.stringify(data)}</pre>

            <button
                onClick={() => {
                    addMessage();
                }}
            >
                Add message
            </button>
        </StyledMainView>
    );
};
