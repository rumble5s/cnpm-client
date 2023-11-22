import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

const App = () => {
    return (
        <HashRouter>    
            <Routes>
                <Route path="/home" element={<MainPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </HashRouter>
    );
};

export default App;