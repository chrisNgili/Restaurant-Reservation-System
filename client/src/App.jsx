import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { UserProvider } from './context/UserContext';

function App(){
    return (
        <BrowserRouter>

        <UserProvider>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Home />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </UserProvider>

        </BrowserRouter>
    )
}


export default App