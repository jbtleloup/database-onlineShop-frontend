import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {useDispatchUser, useUser} from "../components/User";
import ProductCard from "../components/productCard";

const CartPage = () => {
    const user = useUser();
    const dispatch =useDispatchUser();
    const {cart} = user;
    const [items, setItems] = useState(cart);
    let freqDic = {};
    cart.forEach((item) => freqDic[item.id] ? freqDic[item.id]++ : freqDic[item.id] = 1);
    let uniqItems = Object.keys(freqDic).map((id) => cart.find((item) => item.id.toString() === id))

    const removeItemFromCart = (id) => {
        dispatch({
            type: 'removeItemFromCart',
            payload: id,
        });
        const index = items.findIndex((item)=>item.id === id);
        if (index > -1) {
            items.splice(index, 1);
        }
        setItems([...items]);
        freqDic = {};
        items.forEach((item) => freqDic[item.id] ? freqDic[item.id]++ : freqDic[item.id] = 1);
        uniqItems = Object.keys(freqDic).map((id) => cart.find((item) => item.id.toString() === id));
        console.log(uniqItems);
    };
    return (
        <Layout>
            <div className="">
                <div className="hero">
                    <h1 className="title">Your Cart</h1>
                </div>
                {uniqItems.map((item) => <ProductCard key={item.id} item={item} removeItemFromCart={removeItemFromCart}
                                                      mode={"cart"} number={freqDic[item.id]}/>)}
            </div>
        </Layout>
    );
};

export default CartPage;
