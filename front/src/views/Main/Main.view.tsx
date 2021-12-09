import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetChatsQuery } from 'generated/graphql.types';
import { StyledMainView } from './Main.styled';
import { version } from '../../../package.json';

export const MainView: React.FC = () => {
    const { t: __, i18n } = useTranslation();
    const { data } = useGetChatsQuery();
    return (
        <StyledMainView>
            <p>
                {' '}
                {__('Шаблон версии: ')} {version}
            </p>
            <pre>{JSON.stringify(data)}</pre>

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
        </StyledMainView>
    );
};
