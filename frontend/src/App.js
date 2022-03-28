import "./App.css";
import { Routes, Route } from "react-router-dom";

import AppLayout from './components/layout/AppLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
