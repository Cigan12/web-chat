export const checkIsTokenExpired = (token: string) => {
    const splitted = token.split('.');
    const payload = JSON.parse(window.atob(splitted[1]));

    return new Date(payload.exp * 1000) < new Date();
};
