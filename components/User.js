import React, { useReducer, useContext } from 'react'

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();


const initialState ={
    loggedIn: false,
    user: {},
    cart:[],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return initialState;
        case 'addToCart':
            state.cart.push(action.payload);
            localStorage.setItem('user', JSON.stringify(state));
            return state;
        case 'removeItemFromCart':
            const index = state.cart.findIndex((item)=>item.id === action.payload);
            if (index > -1) {
                state.cart.splice(index, 1);
            }
            localStorage.setItem('user', JSON.stringify(state));
            return state;
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserDispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={state}>
                {children}
            </UserStateContext.Provider>
        </UserDispatchContext.Provider>
    )
};

export const useUser = () => useContext(UserStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);
