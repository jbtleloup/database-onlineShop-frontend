import React, {useState} from 'react';
import Layout from "../components/layout";
import fetch, {fetchPost, fetchWithToken} from "../library/fetch";
import useSWR from "swr";
import {useUser} from "../components/User";

const fetchDataItem = async (...args) => {
    const url = args[0];
    if (!url) return;
    const allItems = args[1];
    const purchases = args[2].map(purchase => purchase.id);
    const relevantItems = allItems.filter((item) => purchases.includes(Number(item.invoice_id.split('/')[4])));
    const relevantItemsId = relevantItems.map(item=>item.item_id);
    return Promise.all(
        relevantItemsId.map(async (id)=> {
            return fetchPost(url, {id:id});
        })
    )
};

const ItemRow = ({id, title, item_length, year_released, creator, genre, item_type}) => {
    let duration = "Length: ";
    let creatorName;
    switch (item_type) {
        case 'Movie':
            creatorName = "Director: ";
            break;
        case 'Music':
            creatorName = "Artist: ";
            break;
        default:
            creatorName = "Author: ";
            duration = "Pages: "
    }
    return (
        <div className="sm:flex sm:mx-32 text-gray-800 text-xl my-4">
            <p className="w-1/6">Title: {title}</p>
            <p className="w-1/6">{duration} {item_length}</p>
            <p className="w-1/6">released: {year_released}</p>
            <p className="w-1/6">{creatorName} {creator}</p>
            <p className="w-1/6">Genre: {genre}</p>
            <p className="w-1/6">Type: {item_type}</p>
        </div>
    );
};

const PurchaseHistoryPage = () => {
    const user = useUser();
    const {data: allItems} = useSWR(['/api/purchaseItem', user.user.token], fetchWithToken);
    const {data: purchases} = useSWR(['api/purchase', user.user.token], fetchWithToken);
    const {data: items, error} = useSWR(allItems && purchases ? ['/api/item', allItems, purchases] : null, fetchDataItem);
    if (error) {
        console.log(error);
    }
    console.log(items);
    return (
        <Layout>
            <div className="hero">
                <h1 className="title">Your Purchase History</h1>
            </div>
            <div className="sm:mx-32 my-12">
                {items ? items.map(item => <ItemRow key={item.id} {...item} />) : <></>}
            </div>
        </Layout>
    );
};

export default PurchaseHistoryPage;
