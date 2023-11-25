import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'


const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    //GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR_MODAL: "ERROR_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null
    });
    const navigate = useNavigate();

    // useEffect(() => {
    //     auth.getLoggedIn();
    // }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // case AuthActionType.GET_LOGGED_IN: {
            //     return setAuth({
            //         user: payload.user,
            //         loggedIn: payload.loggedIn,
            //         error: null
            //     });
            // }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: payload.errorMessage
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: payload.errorMessage
                })
            }
            case AuthActionType.ERROR_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload
                })
            }
            default:
                return auth;
        }
    }

    // auth.getLoggedIn = async function () {
    //     const response = await api.getLoggedIn();
    //     if (response.status === 200) {
    //         authReducer({
    //             type: AuthActionType.SET_LOGGED_IN,
    //             payload: {
    //                 loggedIn: response.data.loggedIn,
    //                 user: response.data.user
    //             }
    //         });
    //     }
    // }

    auth.registerUser = async function(username, email, password, passwordVerify) {
        try{
        const response = await api.registerUser(username, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                }
            })
            navigate("/login/");
        }}catch(err) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: null,
                    loggedIn: false,
                    errorMessage: err
                }
                
            })
        }
    }

    auth.loginUser = async function(email, password) {
        try{
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user,
                    loggedIn: true,
                    error: null
                }
            })
            navigate("/profile/");
        }}catch(err) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    error: err
                }
                
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            localStorage.removeItem('token');
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            navigate("/");
        }
    }

    // auth.getUserInitials = function() {
    //     let initials = "";
    //     if (auth.user) {
    //         initials += auth.user.firstName.charAt(0);
    //         initials += auth.user.lastName.charAt(0);
    //     }
    //     console.log("user initials: " + initials);
    //     return initials;
    // }
    auth.closeError = function(){
        authReducer({
            type: AuthActionType.ERROR_MODAL,
            payload: null
            
        })
    }
    auth.isErrorModalOpen = () =>{
        return auth.error !== null;
    }
    
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };