import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfigurationsBasicView from "../components/ConfigurationsBasicView";
import { PreferenceAPI } from "../../../helpers/Api";
import { Preference } from "../../../types/ContextTypes";

interface PreferencesBasicViewPropsType {
    children: any;
}

export default function PreferencesBasicView(props: PreferencesBasicViewPropsType) {

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