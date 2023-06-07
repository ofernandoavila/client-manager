import { Link } from "react-router-dom";
import { Feature } from "../../../../types/ContextTypes";
import { useEffect, useState } from "react";
import { useFeature } from "../../../../hooks/useFeature";

interface FeaturesGridPropsType {
    features?: Feature[] | null;
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function FeaturesGrid(props: FeaturesGridPropsType) {

    async function DeleteItem(slug: string) {
        return;
            // .then(data => {
            //     if (props.onAlertStatus) {
            //         props.onAlertStatus('danger');
            //     }
            //     if (props.onAlert) {
            //         props.onAlert(data.message);
            //     }
            //     if (props.onFetch) {
            //         props.onFetch();
            //     }
            // });
    }

    const { features } = useFeature();

    useEffect(() => {
        console.log(features);
    });

    if(!features) return (<></>);

    return (
        <>
            {  features.length > 0 ? (
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
                        {features.map( item => (
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