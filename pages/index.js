import Layout from "../components/layout";
import React from "react";

export default () => (
    <div>
        <Layout>
            <div className="flex header">
                <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-100 md:text-4xl">The Fastest Online <span
                            className="text-red-600">Shop</span></h2>
                        <p className="mt-2 text-sm text-gray-400 md:text-lg">Buying online has never been that fast and pleasant!
                        Watch your favorite movie or listen to the best musics in one click! Choose among a vast selection of items, validate your purchase, and receive your item by email!
                        It is that simple and that fast!</p>
                        <div className="flex justify-center lg:justify-start mt-6">
                            <a className="px-4 py-3 bg-gray-800 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                               href="#">Get Started</a>
                            <a className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                               href="#">Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2" style={{clipPath:"polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"}}>
                    <div className="h-full bg-contain"
                         style={{backgroundImage: "url('speed-dark.jpg')"}}>
                        {/*<div className="h-full bg-black opacity-25"></div>*/}
                    </div>
                </div>
            </div>
            <div className="hero">
                <h1 className="title">The Fastest Online Shop</h1>
            </div>
        </Layout>
    </div>
)
