import React, {useState} from "react";
import {useRouter} from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout';
import {useDispatchUser} from "../components/User";
import {fetchPost} from "../library/fetch";
import {loginState} from "../library/UserState";

const SignUpPage = () => {
    const dispatch = useDispatchUser();
    const [email, setEmail] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const matchingPasswordCheck = () => password === confirmPassword && password.length > 0;
    const passwordLengthCheck = () => password.length > 7;
    const noEmptyFieldsCheck = () => password && confirmPassword && firstname && lastname;
    const allSignUpChecks = () => matchingPasswordCheck() && passwordLengthCheck() && noEmptyFieldsCheck();

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!allSignUpChecks()) return ;

        let newUser;
        let signupSuccess = false;
        const user = {
            email: email,
            first_name: firstname,
            last_name: lastname,
            password: password,
        };
        try {
            const response = await fetchPost('/api/signup', user);
            newUser = response;
            signupSuccess = !!response.id;
        } catch (e) {
            console.log('error: ', e);
            setIsError(true);
        }
        if (signupSuccess) {
            // login
            try {
                const response = await fetchPost('/api/login', {username: email, password: password});
                if (!response.token) throw "No token received";
                const userState = loginState(newUser, response.token);
                dispatch({
                    ...userState,
                });
                await router.push('/');
            } catch (e) {
                console.log('error: ', e);
                setIsError(true);
            }
        } else {
            setIsError(true);
        }
    };
    return (
        <Layout>
            <Head>
                <title>TFOS - Sign Up</title>
            </Head>
            <div className="container max-w-full mx-auto lg:py-24 py-12 px-6">
                <div className="font-sans">
                    <div className="max-w-sm mx-auto px-6">
                        <div className="relative flex flex-wrap">
                            <div className="w-full relative">
                                <div className="mt-6">
                                    <div className="mb-5 pb-1border-b-2 text-center font-base text-gray-700">
                                        <span>Follow Us <a className="text-blue-500"
                                                           href="https://twitter.com/">@TFOS</a></span>
                                    </div>
                                    <div className="text-center font-semibold text-black">
                                        Create your account and discover a whole new world!
                                    </div>
                                    <form className="mt-8" onSubmit={handleSignUp}>
                                        <div className="mx-auto max-w-lg">
                                            <div className="py-2">
                                                <span className="px-1 text-sm text-gray-600">Last Name</span>
                                                <input placeholder="" type="text"
                                                       className="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300
                                                        placeholder-gray-600 shadow-md focus:placeholder-gray-500
                                                        focus:bg-white focus:border-gray-600 focus:outline-none"
                                                       onChange={(e) => setlastname(e.target.value)}
                                                />
                                            </div>
                                            <div className="py-2">
                                                <span className="px-1 text-sm text-gray-600">First Name</span>
                                                <input placeholder="" type="text"
                                                       className="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300
                                                        placeholder-gray-600 shadow-md focus:placeholder-gray-500
                                                        focus:bg-white focus:border-gray-600 focus:outline-none"
                                                       onChange={(e) => setfirstname(e.target.value)}
                                                />
                                            </div>
                                            <div className="py-2">
                                                <span className="px-1 text-sm text-gray-600">Username</span>
                                                <input placeholder="" type="email"
                                                       className="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300
                                                        placeholder-gray-600 shadow-md focus:placeholder-gray-500
                                                        focus:bg-white focus:border-gray-600 focus:outline-none"
                                                       onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="py-2">
                                                <span className="px-1 text-sm text-gray-600">Password</span>
                                                <input placeholder="" type='password'
                                                       className="text-md block px-3 py-2 rounded-lg w-full
                                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                                            focus:placeholder-gray-500 focus:bg-white
                                                            focus:border-gray-600 focus:outline-none"
                                                       onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="py-2">
                                                <span className="px-1 text-sm text-gray-600">Confirm Password</span>
                                                <input placeholder="" type='password'
                                                       className="text-md block px-3 py-2 rounded-lg w-full
                                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                                            focus:placeholder-gray-500 focus:bg-white
                                                            focus:border-gray-600 focus:outline-none"
                                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-start mt-3 ml-4 p-1">
                                                <ul>
                                                    <li className="flex items-center py-1">
                                                        <div
                                                            className={`rounded-full p-1 fill-current ${matchingPasswordCheck() ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                                                 stroke="currentColor">
                                                                <path
                                                                    className={matchingPasswordCheck() ? 'block' : 'hidden'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M5 13l4 4L19 7"/>
                                                                <path
                                                                    className={matchingPasswordCheck() ? 'hidden' : 'block'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"/>

                                                            </svg>
                                                        </div>
                                                        <span
                                                            className={`font-medium text-sm ml-3 ${matchingPasswordCheck() ? 'text-green-700' : 'text-red-700'}`}>
                                                            {matchingPasswordCheck() ? 'Passwords match' : 'Passwords do not match'}
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center py-1">
                                                        <div
                                                            className={`rounded-full p-1 fill-current ${passwordLengthCheck() ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                                                 stroke="currentColor">
                                                                <path
                                                                    className={passwordLengthCheck() ? 'block' : 'hidden'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M5 13l4 4L19 7"/>
                                                                <path
                                                                    className={passwordLengthCheck() ? 'hidden' : 'block'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"/>

                                                            </svg>
                                                        </div>
                                                        <span
                                                            className={`font-medium text-sm ml-3 ${passwordLengthCheck() ? 'text-green-700' : 'text-red-700'}`}
                                                        >
                                                            {passwordLengthCheck() ? 'The minimum length is reached' : 'At least 8 characters required'}
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center py-1">
                                                        <div
                                                            className={`rounded-full p-1 fill-current ${noEmptyFieldsCheck() ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                                                 stroke="currentColor">
                                                                <path
                                                                    className={noEmptyFieldsCheck() ? 'block' : 'hidden'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M5 13l4 4L19 7"/>
                                                                <path
                                                                    className={noEmptyFieldsCheck() ? 'hidden' : 'block'}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"/>

                                                            </svg>
                                                        </div>
                                                        <span
                                                            className={`font-medium text-sm ml-3 ${noEmptyFieldsCheck() ? 'text-green-700' : 'text-red-700'}`}
                                                        >
                                                            {noEmptyFieldsCheck() ? 'All the fields are filled out' : 'At least 1 field is empty'}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p className={`text-center text-red-700 ${isError ? 'block' : 'hidden'}`}>Something
                                                is wrong, this email address may already be used</p>
                                            <button
                                                className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg
                                                px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
        ;
};

export default SignUpPage;
