import React, { createContext, useState, useEffect } from 'react'
import {api_url} from '../config.json'
import { toast } from 'react-toastify'
import { Children } from 'react'
import { useNavigate } from 'react-router-dom'


export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    console.log(user)
    const [auth_token, setAuthToken] = useState(() => localStorage.getItem("access_token"));

    console.log("Current user:", user);

    function register_user(name, email, phone, password){
        toast.loading("Registering user...")
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
                toast.dismiss()
                toast.error(res.error)
            }
            else if(res.success){
                toast.dismiss()
                toast.success(res.success)
                navigate("/login")
            }
            else{
                toast.dismiss()
                toast.error("Something went wrong")
            }
        })
    }

    function login_user(email, password){
        toast.loading("Entering...")
        fetch(`${api_url}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ email:email, password:password})
        })
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss()
                toast.error(res.error)
            }
            else if(res.access_token){
                toast.dismiss()
                toast.success(res.success)

                localStorage.setItem("access_token", res.access_token)
                setAuthToken(res.access_token)
                navigate("/")
            }
            else{
                toast.dismiss()
                toast.error("Something went wrong")
            }

        })
    }

    function logout_user() {
    if (!auth_token) {
        toast.error("Please Login first");
        return;
    }

    fetch(`${api_url}/logout`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${auth_token}`
        }
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(res => {
        if (res.success) {
        toast.success(res.success);
        localStorage.removeItem("access_token");
        setAuthToken(null);
        setUser(null);
        navigate("/login");
        }
    })
    .catch(error => {
        console.error("Error during logout:", error);
        toast.error("An error occurred during logout");
    });
    }

    function update_user(name, email, phone, password, newPassword){
        toast.loading("Updating profile...");
        fetch(`${api_url}/update_user`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth_token}`
            },
            body: JSON.stringify({name:name, email:email, phone:phone, password:password, newPassword:newPassword})
        })
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss()
                toast.error(res.error)
            }
            else if(res.success){
                toast.dismiss()
                toast.success(res.success)
            }
            else{
                toast.dismiss()
                toast.error("Something went wrong")
            }
        })
    }

    function delete_profile(){
        toast.loading("Deleting profile...");
        fetch(`${api_url}/delete_user`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then(res =>res.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);
                localStorage.removeItem("access_token");
                setAuthToken(null);
                setUser(null)
                navigate("/login");
            }
            else{
                toast.dismiss();
                toast.error("Could not delete profile, Error.");
            }
        })
    }



    useEffect(() => {
        if(auth_token){
            fetch(`${api_url}/logged_in`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                }
            })
            .then(response => response.json())
            .then(res => {
                if(res.error){
                    toast.error(res.error)
                }
                else{
                    setUser(res)
                }
            })
        }
    }, [auth_token])


    const context_info = {
        auth_token,
        user,
        register_user,
        login_user,
        logout_user,
        update_user,
        delete_profile
    }
    return (
        <UserContext.Provider value={context_info}>
            {children}
        </UserContext.Provider>
    )
}