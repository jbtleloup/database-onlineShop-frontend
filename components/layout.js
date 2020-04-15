import Head from 'next/head';
import React from "react";
import Nav from "./nav";

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>Fastest Online Shop</title>
                <meta
                    key="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta
                    name="description"
                    content="Online shop for Database project using Next.js"
                />
                <meta property="og:title" content="Fastest Online Shop!"/>
                <meta
                    property="og:description"
                    content="Online shop for Database project using Next.js"
                />
                <meta
                    property="og:image"
                    content="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                />
            </Head>
            <Nav/>
            <main className="">
                {children}
            </main>
            <footer className="h-16 mt-6">
                <p className="text-center">Made with Love by JB</p>
            </footer>
        </>
    )
}
