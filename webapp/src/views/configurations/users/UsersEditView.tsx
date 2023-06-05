import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UsersAPI } from "../../../api/UsersAPI";
import UsersBasicView from "./UsersBasicView";
import UserForm from "./forms/UserForm";
import { UserType } from "../../../types/UserType";

export default function UsersEditView() {
    const { userHash } = useParams();

    const [user, setUser] = useState<UserType>();

    const fetchData = async () => {
        await UsersAPI.get(userHash!)
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