import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
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

const RequireAdmin = ({ children }) => {
    if (JSON.parse(localStorage.getItem("isadmin")))
        return children;

    return <Navigate to="/login" />
}

const RequireUser = ({ children }) => {
    if (JSON.parse(localStorage.getItem("groupid")))
        return children;

    return <Navigate to="/login" />
}

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/department" element={<RequireAdmin><Department /></RequireAdmin>} />
                <Route path="/room" element={<RequireAdmin><Room /></RequireAdmin>} />
                <Route path="/bill" element={<RequireAdmin><BillInformation /></RequireAdmin>} />
                <Route path="/register" element={<RequireAdmin><Register /></RequireAdmin>} />
                <Route path="/parking" element={<RequireAdmin><ParkingFee /></RequireAdmin>} />
                <Route path="/user" element={<RequireUser><UserMain /></RequireUser>} />
                <Route path="/udepartment" element={<RequireUser><UserDepartment /></RequireUser>} />
                <Route path="/family" element={<RequireUser><Family /></RequireUser>} />
                <Route path="/userbills" element={<RequireUser><UserBills /></RequireUser>} />
            </Routes>
        </HashRouter>
    );
};

export default App;