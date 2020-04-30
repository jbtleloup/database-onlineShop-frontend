import Layout from "../components/layout";
import React from "react";
import nodeFetch from 'node-fetch';
import Link from "next/link";
import fetch from '../library/fetch';
import useSWR from 'swr';
import {useUser} from "../components/User";

const Item = ({id, title, item_length, year_released, creator, genre, price, item_type, discount, urlPic}) => {
    const {data, error} = useSWR(discount ? `/api/discount?discountUrl=${discount}` : null, fetch);

    if (error) {
        console.log(error);
    }

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
        <div className="m-auto max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden my-10 relative"
             style={{height: "480px"}}>
            <div className="px-4 py-2">
                <h1 className="text-gray-900 font-bold text-3xl uppercase">{title}</h1>
                <div className="flex text-center">
                    <ul className="text-gray-600 text-lg mt-1 w-1/2 tracking-wider">
                        <li key={1}><span className="font-semibold">{duration}</span> <br/> {item_length}</li>
                        <li key={2}><span className="font-semibold">released: </span><br/> {year_released}</li>
                    </ul>
                    <ul className="text-gray-600 text-lg mt-1 w-1/2 tracking-wider">
                        <li key={3}><span className="font-semibold">{creatorName} </span><br/> {creator}</li>
                        <li key={4}><span className="font-semibold">genre: </span><br/> {genre}</li>
                    </ul>
                </div>
            </div>
            <div className="absolute bottom-0">
                <img className="h-56 w-full object-cover mt-2"
                     src={urlPic}
                     alt="item image"/>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                    <h1 className="text-gray-200 font-bold text-xl">${price}</h1>
                    {discount && data ?
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full text-sm"
                                type="button">
                                {data.percent_off * 100}% off
                            </button>
                        </div> : <></>
                    }
                    <Link href="/product/[id]" as={`/product/${id}`}>
                        <a className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">View Item</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ProductsPage = ({items}) => {
    const user = useUser();
    const filteredItems = items.filter((item) => !user.cart.some((cartItem) => cartItem.id === item.id));
    return (
        <div>
            <Layout>
                <div className="hero">
                    <h1 className="title">Our Products</h1>
                    <div className="sm:flex sm:flex-wrap sm:m-16 sm:justify-between">
                        {filteredItems.map(item => <Item key={item.id} {...item}/>)}
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export async function getStaticProps() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const raw = await nodeFetch('http://3.87.30.125:8000/item/');
    const items = await raw.json();
    // console.log(items);
    // Pass post data to the page via props
    return {props: {items}}
}

export default ProductsPage;
