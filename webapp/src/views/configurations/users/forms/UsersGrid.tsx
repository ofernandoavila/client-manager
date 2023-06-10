import { Link } from "react-router-dom";
import { UserAPI } from "../../../../helpers/Api";
import { User } from "../../../../types/ContextTypes";
import { useEffect, useState } from "react";

interface UsersGridPropsType {
    users: Array<User> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function UsersGrid(props: UsersGridPropsType) {

    const [users, setUsers] = useState<User[]>();

    const fetchData = async () => {
        const api = new UserAPI();
        return await api.getAll()
            .then( data => {
                setUsers(data);
            })
    };

    async function DeleteItem(userHash: string) {
        const api = new UserAPI();
        return await api.delete(userHash)
            .then(data => {
                if (props.onAlertStatus) {
                    props.onAlertStatus('danger');
                }
                if (props.onAlert) {
                    props.onAlert(data.message);
                }
                if (props.onFetch) {
                    props.onFetch();
                }
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!users) return (<></>);

    return (
        <>
            {  users.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.username }</td>
                                <td>{ item.email }</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={'/configurations/users/edit/' + item.userHash } ><button type="button" className="btn btn-sm btn-outline-secundary">Edit</button></Link>
                                        <button type="button" onClick={() => DeleteItem(item.userHash!)} className="btn btn-sm btn-outline-secundary">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            ) : <span>There is no users to show</span>
        }   
        </>
    );
}