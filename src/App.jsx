import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </HashRouter>
    );
};

export default App;