import Layout from "../components/layout";
import React from "react";
import fetch from 'node-fetch';
import Link from "next/link";

const Movie = ({id, title, item_length, year_released, creator, genre, price, item_type}) => {
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
                     src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                     alt="NIKE AIR"/>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                    <h1 className="text-gray-200 font-bold text-xl">${price}</h1>
                    <Link href="/product/[id]" as={`/product/${id}`}>
                        <a className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">View Item</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const ProductsPage = ({items}) => {
    return (
        <div>
            <Layout>
                <div className="hero">
                    <h1 className="title">Our Products</h1>
                    <div className="sm:flex sm:flex-wrap sm:m-16 sm:justify-between">
                        {items.map(item => <Movie key={item.id} {...item}/>)}
                    </div>
                </div>
            </Layout>
        </div>
    )
};

export async function getStaticProps() {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const raw = await fetch('http://3.87.30.125:8000/item/');
    const items = await raw.json();
    // Pass post data to the page via props
    return {props: {items}}
}

export default ProductsPage;
