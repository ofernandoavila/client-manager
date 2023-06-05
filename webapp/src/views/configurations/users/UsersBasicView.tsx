import { Link } from "react-router-dom";
import ConfigurationsBasicView from "../ConfigurationsBasicView";

export interface UsersBasicViewPropsType {
    children: any;
}

export default function UsersBasicView(props: UsersBasicViewPropsType) {
    return (
        <ConfigurationsBasicView currentMenu="Users">
            <div className="d-flex justify-content-between mb-4">
                <h3>Users</h3>
                <Link to={'/configurations/users/new'}> <button className="btn btn-primary">Create new user</button> </Link>
            </div>
            { props.children }
        </ConfigurationsBasicView>
    );
}