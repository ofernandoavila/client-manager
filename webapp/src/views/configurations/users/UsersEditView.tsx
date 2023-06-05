import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UsersBasicView from "./UsersBasicView";
import UserForm from "./forms/UserForm";
import { UserAPI } from "../../../helpers/Api";
import { User } from "../../../types/ContextTypes";

export default function UsersEditView() {
    const { userHash } = useParams();

    const [user, setUser] = useState<User>();

    const fetchData = async () => {
        await UserAPI.prototype.get(userHash!)
            .then( data => {
                setUser(data.user);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!user) return <></>;

    return (
        <UsersBasicView>
            <UserForm user={user} edit/>
        </UsersBasicView>
    );
}