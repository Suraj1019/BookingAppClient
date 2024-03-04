import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegisterPage";
import { createContext, useEffect, useState } from "react";
import AccountPage from "./Pages/AccountPage";
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
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage?/:action?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
