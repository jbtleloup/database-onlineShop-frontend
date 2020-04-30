import fetch, {fetchPost, fetchPostWithToken, fetchWithToken} from "./fetch";

export const getUsers = async () => {
    return await fetch('http://3.87.30.125:8000/user/');
};

export const getItems = async () => {
    return await fetch('http://3.87.30.125:8000/items/');
};

export const getUserFromEmail = async (email) => {
    const users = await getUsers();
    return users.find(user => user.email === email);
};

export const getPurchaseHistory = async (token) => {
    const rawResponse = await fetch('http://3.87.30.125:8000/purchaseHistory/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        }
    });
    return await rawResponse.json();
};

export const login = async (email, password) => {
    return await fetchPost('http://3.87.30.125:8000/api-token-auth/', {username: email, password: password});
};

export const purchase = async (price, paymentMethod = "credit card", token) => {
    return await fetchPostWithToken('http://3.87.30.125:8000/purchase/', {
        final_price: price,
        payment_method: paymentMethod
    }, token)
};

export const getPurchase = async (token) => {
    return await fetchWithToken('http://3.87.30.125:8000/purchase/', token)
};

export const purchasedItem = async (item_id, invoice_id, token) => {
    return await fetchPostWithToken('http://3.87.30.125:8000/purchaseditem/', {
        invoice_id: `http://3.87.30.125:8000/purchase/${invoice_id}/`,
        item_id: `http://3.87.30.125:8000/item/${item_id}/`
    }, token);
};

export const getPurchasedItem = async (token) => {
    return await fetchWithToken('http://3.87.30.125:8000/purchaseditem/',  token);
};
