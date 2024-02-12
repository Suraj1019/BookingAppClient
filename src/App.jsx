import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
