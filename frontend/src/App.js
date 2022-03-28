import "./App.css";
import { Routes, Route } from "react-router-dom";

import Signup from './pages/Signup'
import Login from './pages/Login'
import AppLayout from './components/layout/AppLayout'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<AppLayout />}>
                    {/* <Route index element={<Home />} /> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
