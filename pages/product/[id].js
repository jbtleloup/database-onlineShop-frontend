import fetch from 'node-fetch';
import React from "react";
import Layout from '../../components/layout';
import {useDispatchUser, useUser} from "../../components/User";
import ProductCard from "../../components/productCard";
import {useRouter} from "next/router";

const Product = ({item}) => {
    const dispatch = useDispatchUser();
    const user = useUser();
    const router = useRouter();

    const handleItemCart = async () => {
        dispatch({
            type: "addToCart",
            payload: item,
        });
        await router.push('/products');
    };
    return (
        <Layout>
            <div className="">
                <div className="hero">
                    <h1 className="title">Our Products</h1>
                </div>
                <ProductCard item={item} handleItemCart={handleItemCart}/>
            </div>
        </Layout>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://3.87.30.125:8000/item/');
    const items = await res.json();
    // Get the paths we want to pre-render based on posts
    const paths = items.map(item => `/product/${item.id}`);

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false}
}

// This also gets called at build time
export async function getStaticProps({params}) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`http://3.87.30.125:8000/item/${params.id}`);
    const item = await res.json();
    // Pass post data to the page via props
    return {props: {item}}
}

export default Product;
