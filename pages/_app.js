import App from 'next/app'
import '../styles/index.css'
import { UserProvider } from '../components/User'
import React from "react";

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        )
    }
}

export default MyApp
