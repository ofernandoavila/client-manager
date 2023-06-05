import { Link } from "react-router-dom";
import BasicView from "../../BasicView";
import ConfigurationsMenu from "../ConfigurationsMenu";
import PreferencesGrid from "./forms/PreferencesGrid";
import { useEffect, useState } from "react";
import { PreferenceType } from "../../../types/PreferenceType";
import { PreferencesAPI } from "../../../api/PreferencesAPI";
import ConfigurationsBasicView from "../ConfigurationsBasicView";


interface PreferencesBasicViewPropsType {
    children: any;
}


export default function PreferencesBasicView(props: PreferencesBasicViewPropsType) {

    const [preferences, setPreferences] = useState<Array<PreferenceType> | null>(null);

    const fetchData = async () => {
        await PreferencesAPI.getAll()
            .then( data => {
                setPreferences(data.preferences!);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ConfigurationsBasicView currentMenu="Preferences">
            <div className="d-flex justify-content-between mb-4">
                <h3>Preferences</h3>
                <Link to={'/configurations/preferences/new'}> <button className="btn btn-primary">Create new preference</button> </Link>
            </div>
            { props.children }
        </ConfigurationsBasicView>
    );
}