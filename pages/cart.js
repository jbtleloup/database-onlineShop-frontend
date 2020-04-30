import React, {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {useDispatchUser, useUser} from "../components/User";
import ProductCard from "../components/productCard";
import fetch, {fetchPost} from '../library/fetch';
// import useSWR from 'swr';
import {useRouter} from "next/router";

const CartPage = () => {
    const router = useRouter();
    const user = useUser();
    const dispatch = useDispatchUser();
    const [realTotal, setRealTotal] = useState(0);
    const [cart, setCart] = useState(user.cart);

    const total = cart.reduce((acc, value) => Number(value.price) + acc, 0);

    useEffect(() => {
        async function fetchDiscounts() {
            const discounts = await Promise.all(cart.map(async (item) => {
                if (item.discount) {
                    return await fetch(`api/discount?discountUrl=${item.discount}`);
                }
            }));
            let totalWithDiscount = 0;
            for (let i = 0; i < cart.length; i++) {
                const price = Number(cart[i].price);
                if (cart[i].discount) {
                    const discountAmount = Number(discounts[i].percent_off);
                    totalWithDiscount += price - (discountAmount * price);
                } else {
                    totalWithDiscount += price;
                }
            }
            setRealTotal(totalWithDiscount);
        }

        fetchDiscounts();
    }, [cart]);

    /*// Burk... (not to self) Please refactor + you can't buy twice the same item... So unnecessary...
    cart.forEach((item) => freqDic[item.id] ? freqDic[item.id]++ : freqDic[item.id] = 1);
    let uniqItems = Object.keys(freqDic).map((id) => cart.find((item) => item.id.toString() === id));
    // total = items.reduce((acc, val) => Number(acc) + Number(val.price), 0);
    let total = 0;
    items.forEach((item) => {
        total = total + Number(item.price);
    });
    // console.log(total);
    newTotal = 0;
    items.map(async (item) => {
        const price = Number(item.price);
        if (item.discount) {
            // ({data, error} = useSWR(`api/discount?discountUrl=${item.discount}`, fetch));
            const discount = await fetch(`api/discount?discountUrl=${item.discount}`);
            if (discount) {
                // console.log(price * Number(discount.percent_off));
                newTotal = newTotal + (price - (price * Number(discount.percent_off)));
            }
        } else {
            newTotal = newTotal + price;
        }
        // console.log(newTotal);
    });*/
    const handlePurchase = async () => {
        const purchaseData = await fetchPost('/api/purchase', {
            final_price: realTotal,
            payment_method: "credit card",
            token: user.user.token
        });
        console.log(purchaseData);
        const invoiceId = purchaseData.id;
        cart.map(async (item) => {
            const purchasedItem = await fetchPost('/api/purchaseItem', {
                item_id: item.id,
                invoice_id: invoiceId,
                token: user.user.token,
            });
        });
        dispatch({
            type: "clearCart"
        });
        await router.push('/purchaseHistory');
    };

    const removeItemFromCart = (id) => {
        // TODO: dispatch should force component reload...
        dispatch({
            type: 'removeItemFromCart',
            payload: id,
        });
        const index = cart.findIndex((item) => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
        }
        setCart([...cart]);
    };
    return (
        <Layout>
            <div className="">
                <div className="hero">
                    <h1 className="title">Your Cart</h1>
                </div>
                {
                    cart.map((item) => <ProductCard key={item.id} item={item}
                                                    removeItemFromCart={removeItemFromCart}
                                                    mode={"cart"}/>)
                }
                <div className="sm:mx-32 mx-3 py-12">
                    <h2 className="text-4xl text-gray-800 font-bold mx-16 inline-block">Total: ${realTotal}</h2>
                    <h3 className="inline-block text-4xl text-gray-800 font-bold mx-16">{realTotal !== total ? `You saved: $${total - realTotal}` : 'No Discounted Items'} </h3>
                    <button
                        className="sm:float-right text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 mx-16 text-2xl "
                        type="button"
                        onClick={handlePurchase}
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
