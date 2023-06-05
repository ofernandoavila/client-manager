import { Link } from "react-router-dom";
import BasicView from "../../BasicView";
import ConfigurationsMenu from "../ConfigurationsMenu";
import UsersGrid from "./forms/UsersGrid";
import { UsersAPI } from "../../../api/UsersAPI";
import { useState, useEffect } from "react";
import { PreferenceType } from "../../../types/PreferenceType";
import { UserType } from "../../../types/UserType";
import UsersBasicView from "./UsersBasicView";

export default function UsersView() {

    const [users, setUsers] = useState<Array<UserType> | null>(null);

    const fetchData = async () => {
        await UsersAPI.getAll()
            .then( data => {
                setUsers(data.users);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <UsersBasicView>
            <UsersGrid users={users} onFetch={fetchData}/>
        </UsersBasicView>
    );
}