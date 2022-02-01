import React, { useEffect, useRef, useState } from 'react';

import {
    StyledBurger,
    StyledDropdown,
    StyledDropdownItem,
    StyledMenu,
} from './Menu.component.styled';

export interface IMenuItem {
    iconSrc: string;
    alt: string;
    text: string;
    onClick: () => void;
}

interface IMenuProps {
    menu: Array<IMenuItem>;
}

export const Menu: React.FC<IMenuProps> = ({ menu }) => {
    const [dropdown, setDropdown] = useState(false);

    const dropDownRef = useRef<HTMLUListElement>(null);

    const toggleDropdown = () => {
        setDropdown((prev) => !prev);
    };

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const path = e.composedPath();
            if (dropDownRef.current) {
                if (!path.includes(dropDownRef.current)) {
                    toggleDropdown();
                }
            }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    return (
        <StyledMenu>
            <StyledBurger
                onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown();
                }}
            >
                <div />
                <div />
                <div />
            </StyledBurger>
            {dropdown && (
                <StyledDropdown ref={dropDownRef}>
                    {menu.map((menuItem) => (
                        <StyledDropdownItem
                            key={menuItem.text}
                            onClick={() => {
                                menuItem.onClick();
                                toggleDropdown();
                            }}
                        >
                            <img src={menuItem.iconSrc} alt={menuItem.alt} />{' '}
                            {menuItem.text}
                        </StyledDropdownItem>
                    ))}
                </StyledDropdown>
            )}
        </StyledMenu>
    );
};
