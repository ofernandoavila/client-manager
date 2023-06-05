import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PreferencesHelper } from "../../../helpers/PreferencesHelper";
import PreferencesBasicView from "./PreferencesBasicView";
import PreferenceForm from "./forms/PreferenceForm";
import { Preference } from "../../../types/ContextTypes";

export default function PreferencesEditView() {
    const { preferenceSlug } = useParams();

    const [preference, setPreference] = useState<Preference>();

    const fetchData = async () => {
        await PreferencesHelper.GetPreference(preferenceSlug!)
            .then( data => {
                setPreference(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(!preference) return <></>;

    return (
        <PreferencesBasicView>
            <PreferenceForm preference={preference} edit/>
        </PreferencesBasicView>
    );
}