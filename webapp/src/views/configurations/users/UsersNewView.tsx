import UsersBasicView from "./UsersBasicView";
import UserForm from "./forms/UserForm";

export default function UsersNewView() {
    return (
        <UsersBasicView>
            <UserForm />
        </UsersBasicView>
    );
}