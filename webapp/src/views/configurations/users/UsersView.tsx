
import UsersGrid from "./forms/UsersGrid";
import { useState, useEffect } from "react";
import UsersBasicView from "./UsersBasicView";
import { UserAPI } from "../../../helpers/Api";
import { User } from "../../../types/ContextTypes";

export default function UsersView() {

    const [users, setUsers] = useState<Array<User> | null>(null);

    const fetchData = async () => {
        await UserAPI.prototype.getAll()
            .then( data => {
                setUsers(data);
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