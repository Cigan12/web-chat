import styled from 'styled-components';

interface IStyledUserCardProps {
    active?: boolean;
}

export const StyledUserCard = styled.div<IStyledUserCardProps>`
    background: ${({ theme, active }) => (active ? theme.purple : theme.white)};
    cursor: pointer;
`;
