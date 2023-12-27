import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { Department } from './pages/Department';
import { Room } from './pages/Room';
import { BillInformation } from './pages/BillsInformation';
import { Register } from './pages/Register';
import { ParkingFee } from './pages/ParkingFee';
import { UserMain } from './pages/UserMain';
import { UserDepartment } from './pages/UserDepartment';
import { Family } from './pages/Family';
import { UserBills } from './pages/UserBills';

const App = () => {
    return (
        <HashRouter>    
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/department" element={<Department/>}/>
                <Route path="/room" element={<Room/>}/>
                <Route path="/bill" element={<BillInformation/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/parking" element={<ParkingFee/>}/>
                <Route path="/user" element={<UserMain/>}/>
                <Route path="/udepartment" element={<UserDepartment/>}/>
                <Route path="/family" element={<Family/>}/>
                <Route path="/userbills" element={<UserBills/>}/>
            </Routes>
        </HashRouter>
    );
};

export default App;