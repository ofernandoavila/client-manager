import { Link } from "react-router-dom";
import { UserType } from "../../../../types/UserType";
import { UsersAPI } from "../../../../api/UsersAPI";

interface UsersGridPropsType {
    users: Array<UserType> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function UsersGrid(props: UsersGridPropsType) {

    async function DeleteItem(userHash: string) {
        return await UsersAPI.delete(userHash)
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

    if(!props.users) return (<></>);

    return (
        <>
            {  props.users.length > 0 ? (
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
                        {props.users.map( item => (
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