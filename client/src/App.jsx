import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Restaurant from './pages/Restaurants';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import { UserProvider } from './context/UserContext';
import { RestaurantProvider } from './context/RestaurantContext';

import {AdminDashboard, ManageUsers, CreateRestaurant, ManageReservations, ManageMenus,} from './pages/admin';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <RestaurantProvider>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/restaurants" element={<Restaurant />} />
              <Route path="/restaurants/:id" element={<Restaurant />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservations" element={<Reservations />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/create-restaurant" element={<CreateRestaurant />} />
              <Route path="/admin/reservations" element={<ManageReservations />} />
              <Route path="/admin/menus" element={<ManageMenus />} />
            </Route>
          </Routes>
        </RestaurantProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
