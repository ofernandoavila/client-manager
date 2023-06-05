import { Link } from "react-router-dom";
import { PreferenceType } from "../../../../types/PreferenceType";
import { PreferencesAPI } from "../../../../api/PreferencesAPI";

interface PreferencesGridPropsType {
    preferences: Array<PreferenceType> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function PreferencesGrid(props: PreferencesGridPropsType) {

    async function DeleteItem(slug: string) {
        return await PreferencesAPI.delete(slug)
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

    if(!props.preferences) return (<></>);

    return (
        <>
            {  props.preferences.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.preferences.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.value }</td>
                                <td>{ item.slug }</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={'/configurations/preferences/edit/' + item.slug } ><button type="button" className="btn btn-sm btn-outline-secundary">Edit</button></Link>
                                        { !item.isFromSystem ? <button type="button" onClick={() => DeleteItem(item.slug!)} className="btn btn-sm btn-outline-secundary">Delete</button> : '' }
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            ) : <span>There is no orders to show</span>
        }   
        </>
    );
}