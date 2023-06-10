import { Link } from "react-router-dom";
import { PreferenceAPI } from "../../../../helpers/Api";
import { Preference } from "../../../../types/ContextTypes";
import { useEffect, useState } from "react";

interface PreferencesGridPropsType {
    preferences: Array<Preference> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function PreferencesGrid(props: PreferencesGridPropsType) {

    const [preferences, setPreferences] = useState<Preference[]>();

    const fetchData = async () => {
        const api = new PreferenceAPI();
        return await api.getAll()
                .then(data => {
                    setPreferences(data);
                });
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function DeleteItem(slug: string) {
        return await PreferenceAPI.prototype.delete(slug)
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

    if(!preferences) return (<></>);

    return (
        <>
            {  preferences.length > 0 ? (
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
                        { preferences.map( item => (
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