import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Layout from "./Layout";
import RegisterPage from "./Pages/Register";
import { createContext, useEffect, useState } from "react";
import PlacesFormPage from "./Pages/PlacesForm";
import PlacesPage from "./Pages/Places";
import Bookings from "./Pages/Bookings";
import ProfilePage from "./Pages/Profile";
import Home from "./Pages/Home";
import Place from "./Pages/Place";
import { ToastContainer } from "react-toastify";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("userData");
    setUser(JSON.parse(data));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/account/bookings/:id/:bookingId" element={<Place />} />
        </Route>
      </Routes>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
