import "./App.css";
import { Routes, Route } from "react-router-dom";

import jwtInterceptor from "./_helpers/jwt.interceptor";
import AppLayout from './components/layout/AppLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

function App() {
    const token = localStorage.getItem('token')
    jwtInterceptor(token);		// axios request interceptor

    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/new' element={<AddContact />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
