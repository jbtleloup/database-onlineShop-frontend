export const loginState = (user, token, cart=[]) => {
    return {
        type: 'login',
        payload: {
            loggedIn: true,
            user: {
                ...user,
                token: token,
            },
            cart: [],
        },
    };
};
