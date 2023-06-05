import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormHelper } from "../../../../helpers/FormHelper";
import { PreferencesAPI, PreferencesAPIResponseType } from "../../../../api/PreferencesAPI";
import { PreferenceType } from "../../../../types/PreferenceType";

export interface PreferenceFormPropsType {
    preference?: PreferenceType;
    edit?: boolean;
}

export default function PreferenceForm(props: PreferenceFormPropsType) {
    const navigate = useNavigate();

    async function createPreference() {
        if (!FormHelper.ValidateForm()) return false;

        await PreferencesAPI.create({
            name,
            value
        }).then( (data: PreferencesAPIResponseType) => {
            navigate("/configurations/preferences", { state: { alert: data.message, alertType: 'success' } });
        });
    }

    async function editPreference() {
        if (!FormHelper.ValidateForm()) return false;

        await PreferencesAPI.edit({
            slug: props.preference!.slug,
            name: props.preference!.name,
            value: value
        }).then( (data: PreferencesAPIResponseType) => {
            navigate("/configurations/preferences", { state: { alert: data.message, alertType: 'success' } });
        });
    }

    const HandleFormButton = (event: any) => {
        event.preventDefault();

        if(props.edit) {
            editPreference();
        } else {
            createPreference();
        }
    };

    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if(props.preference != null) {
            setName(props.preference.name);
            setValue(props.preference.value);
        }
    }, [props.preference]);

    return (
        <>
            <h2>Create preference</h2>
            <form action="">
                <div className="form-group my-4">
                    <label htmlFor="name" className="mb-2">
                        <span className="text-danger">* </span>
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Currency"
                        value={name}
                        onChange={(event) =>
                            setName(event?.target.value)
                        }
                        disabled={ props.edit ? true : false }
                        required={ !props.edit ? true : false }
                    />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="value" className="mb-2">
                        <span className="text-danger">* </span>
                        Value
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="value"
                        placeholder="R$"
                        value={value}
                        onChange={(event) =>
                            setValue(event?.target.value)
                        }
                        required
                    />
                </div>
                <button
                    type="submit"
                    onClick={HandleFormButton}
                    className="btn btn-primary"
                >
                    { props.edit ? "Save changes" : "Create new preference" }
                </button>
                <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => navigate("/configurations/preferences")}
                >
                    Cancel
                </button>
            </form>
        </>
    );
}
