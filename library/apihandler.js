export const getUsers = async () => {
    const rawResponse = await fetch('http://3.87.30.125:8000/user/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return rawResponse.json();
};

export const getItems = async () => {
    const rawResponse = await fetch('http://3.87.30.125:8000/items/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return rawResponse.json();
};

export const getUserFromEmail = async (email) => {
    const rawResponse = await fetch('http://3.87.30.125:8000/user/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const response = await rawResponse.json();
    console.log(response);
    return response.find(user => user.email === email);
};

export const login = async (email, password) => {
    const rawResponse = await fetch('http://3.87.30.125:8000/api-token-auth/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: email, password: password}),
    });
    return rawResponse.json();
};
