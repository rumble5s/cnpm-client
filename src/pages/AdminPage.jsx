import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";

export const AdminPage = () => {

    const [AllGroup, setAllGroups] = useState([]);

    useEffect(() => {
        async () => {
            try {
                const response = await axios({
                    method: 'POST',
                    url: BASE_URL + '/admin_get_groups/',
                    data: {
                        auth: JSON.parse(localStorage.getItem('isadmin')),
                    }
                });

                if (response.data.error)
                    alert(response.data.error);
                else {
                    setAllGroups(response.data.groups);
                    console.log(AllGroup);
                }

            } catch (error) {
                alert("Cant connect to server");
            }
        }
    }, []);

    return (
        <>
            <NavBar />
        </>
    );
};