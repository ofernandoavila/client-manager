import PreferencesBasicView from "./PreferencesBasicView";
import PreferenceForm from "./forms/PreferenceForm";

export default function PreferencesNewView() {
    return (
        <PreferencesBasicView>
            <PreferenceForm />
        </PreferencesBasicView>
    );
}