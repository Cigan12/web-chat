import styled from 'styled-components';

export const StyledMenu = styled.div`
    position: relative;
`;

export const StyledBurger = styled.div`
    cursor: pointer;
    width: 20px;
    height: 14px;
    display: grid;
    grid-template-rows: max-content max-content max-content;
    gap: 4px;
    div {
        height: 2px;
        background: ${({ theme }) => theme.colors.boldGray};
        width: 100%;
    }
`;

export const StyledDropdown = styled.ul`
    position: absolute;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    z-index: 1;
    top: 31px;
`;

export const StyledDropdownItem = styled.li`
    cursor: pointer;
    margin-top: 6px;
    margin-bottom: 7px;
    padding: 8px 17px 7px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 20px;
    align-items: center;
    transition: background 0.3s easy-in-out;
    :hover {
        background: ${({ theme }) => theme.colors.mediumGray};
    }
`;
