import React, { createContext, useState, useEffect } from 'react'
import {api_url} from '../config.json'
import { toast } from 'react-toastify'
import { Children } from 'react'


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    function register_user(name, email, phone, password){
        fetch(`${api_url}/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({name:name, email:email, phone:phone, password:password})
        })
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.error(res.error)
            }
            else if(res.success){
                toast.success(res.success)
            }
            else{
                toast.error("Something went wrong")
            }
        })
    }

    function login_user(){
        console.log("Loggin in user");
        console.log("logged in mandem")
    }

    function logout_user(){
        console.log("Loggin out user...");
    }




    const context_info = {
        user,
        register_user,
        login_user,
        logout_user
    }
    return (
        <UserContext.Provider value={context_info}>
            {children}
        </UserContext.Provider>
    )
}