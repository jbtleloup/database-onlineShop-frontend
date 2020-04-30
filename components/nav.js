import Link from 'next/link'
import React, {useState} from "react";
import {useUser, useDispatchUser} from './User';

export default function Nav() {
    const user = useUser();
    const dispatch = useDispatchUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch({
            type: 'logout',
        });
        localStorage.clear();
    };
    return (
        <nav className="bg-white shadow-lg">
            <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800 md:text-3xl">
                        <Link href="/">
                            <a className="">TFOS</a>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button type="button"
                                className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path className="hidden"
                                      d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                                <path
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row md:block -mx-2 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link href="/products">
                        <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:mx-2">Products</a>
                    </Link>
                    {user.loggedIn ? <>
                            <Link href="/purchaseHistory">
                                <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:mx-2">Purchase History</a>
                            </Link>
                            <Link href="/cart">
                                <a className="text-gray-800 py-2 px-2 md:mx-2 rounded hover:bg-gray-900 hover:text-gray-100">
                                    <img className="w-6 h-auto hidden sm:inline-block pr-1" src="/supermarket.svg"
                                         alt="cart"/>
                                    Your Cart {user.cart.length}
                                </a>
                            </Link>
                            <a href="/" role="button" onClick={handleLogout}
                               className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:mx-2">Logout</a>
                        </>
                        : <>
                            <Link href="/login">
                                <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:mx-2">Sign-In</a>
                            </Link>
                            <Link href="/signup">
                                <a className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:mx-2">Sign-Up</a>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </nav>


    )
}
