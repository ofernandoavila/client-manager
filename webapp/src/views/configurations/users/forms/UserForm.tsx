import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormHelper } from "../../../../helpers/FormHelper";
import { UsersAPI, UsersAPIResponseType } from "../../../../api/UsersAPI";
import { UserType } from "../../../../types/UserType";
import Alert from "../../../../components/Alert";

export interface UserFormPropsType {
    user?: UserType;
    edit?: boolean;
}

export default function UserForm(props: UserFormPropsType) {
    const navigate = useNavigate();

    async function createUser() {
        if (!FormHelper.ValidateForm()) return false;
        if(!FormHelper.ValidatePassword()) {
            setAlertMessage("Passwords does't match");
            setAlertStatus("danger");
            return false;
        }

        await UsersAPI.create({
            name,
            username,
            email,
            password
        }).then( (data: UsersAPIResponseType) => {
            navigate("/configurations/users", { state: { alert: data.message, alertType: 'success' } });
        });
    }

    async function editUser() {
        if (!FormHelper.ValidateForm()) return false;

        await UsersAPI.edit({
            name,
            username,
            email,
            userHash
        }).then( (data: UsersAPIResponseType) => {
            navigate("/configurations/users", { state: { alert: data.message, alertType: 'success' } });
        });
    }

    const HandleFormButton = (event: any) => {
        event.preventDefault();

        if(props.edit) {
            editUser();
        } else {
            createUser();
        }
    };

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userHash, setUserHash] = useState<string>("");

    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    useEffect(() => {
        if(props.user != null) {
            setName(props.user.name);
            setUsername(props.user.username);
            setEmail(props.user.email);
            setUserHash(props.user.userHash!);
        }
    }, [props.user]);

    return (
        <>
            { alertMessage ? <Alert alert={alertMessage} status={alertStatus} /> : '' }
            <h2>{ props.edit ? 'Edit user' : 'Create new user' }</h2>
            <form action="">
                <div className="form-group my-4">
                    <label htmlFor="name" className="mb-2">
                        <span className="text-danger">* </span>
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Currency"
                        value={name}
                        onChange={(event) =>
                            setName(event?.target.value)
                        }
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="username" className="mb-2">
                        <span className="text-danger">* </span>
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="owner_username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event?.target.value)
                        }
                        required
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="email" className="mb-2">
                        <span className="text-danger">* </span>
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="owneremail@example.com"
                        value={email}
                        onChange={(event) =>
                            setEmail(event?.target.value)
                        }
                        disabled={ props.edit ? true : false }
                        required={ !props.edit ? true : false }
                    />
                </div>

                { props.edit ?? (
                    <>
                        <div className="form-group my-4">
                            <label htmlFor="password" className="mb-2">
                                <span className="text-danger">* </span>
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event?.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="confirm-password" className="mb-2">
                                <span className="text-danger">* </span>
                                Confirm password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="confirm-password"
                                placeholder="owneremail@example.com"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event?.target.value)
                                }
                                required
                            />
                        </div>
                    </>
                ) }

                <button
                    type="submit"
                    onClick={HandleFormButton}
                    className="btn btn-primary"
                >
                    { props.edit ? "Save changes" : "Save user" }
                </button>
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => navigate("/configurations/users")}
                >
                    Cancel
                </button>
            </form>
        </>
    );
}
