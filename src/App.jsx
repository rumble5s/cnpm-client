import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { Department } from './pages/Department';

const App = () => {
    return (
        <HashRouter>    
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/department" element={<Department/>}/>
            </Routes>
        </HashRouter>
    );
};

export default App;