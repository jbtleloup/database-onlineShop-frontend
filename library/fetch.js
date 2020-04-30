import fetch from 'isomorphic-unfetch';

export default async function (...args) {
    const res = await fetch(...args);
    return res.json();
}

export const fetchWithToken = async (...args) => {
    const res = await fetch(args[0], {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + args[1],
        },
    });
    return res.json();
};

export const fetchPost = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const fetchPostWithToken = async (url, data, token) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};


