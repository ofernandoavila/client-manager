import { Link } from "react-router-dom";
import { FeatureType } from "../types/FeatureType";
import { FeatureAPI } from "../api/FeatureAPI";

interface FeaturesGridPropsType {
    features: Array<FeatureType> | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function FeaturesGrid(props: FeaturesGridPropsType) {

    async function DeleteItem(slug: string) {
        return;
        return await FeatureAPI.delete(slug)
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

    if(!props.features) return (<></>);

    return (
        <>
            {  props.features.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.features.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.slug }</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={'/configurations/features/edit/' + item.slug } ><button type="button" className="btn btn-sm btn-outline-secundary">Edit</button></Link>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            ) : <span>There is no features to show</span>
        }   
        </>
    );
}