import React, {createContext, useState, useEffect, useContext} from "react";
import {api_url} from "../config.json";
import {toast} from "react-toastify";
import {UserContext} from "./UserContext";
import {useNavigate} from "react-router-dom";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({children}) => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const {auth_token} = useContext(UserContext);
    const [onChange, setOnChange] = useState(false);

    useEffect(() => {
        if(auth_token){
            fetch(`${api_url}/restaurants`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${auth_token}`
                }
            })
            .then(response => response.json())
            .then( res => {
                if(res.error){
                    toast.error(res.error)
                }
                else {
                    setRestaurants(res);
                }
            })
        }
    }, [auth_token])



    const context_data={
        restaurants,

    }
    return (
        <RestaurantContext.Provider value={context_data}>
            {children}
        </RestaurantContext.Provider>
    );
}