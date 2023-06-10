import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormHelper } from "../../../../helpers/FormHelper";
import { PreferenceAPI } from "../../../../helpers/Api";
import { Preference } from "../../../../types/ContextTypes";

export interface PreferenceFormPropsType {
    preference?: Preference;
    edit?: boolean;
}

export default function PreferenceForm(props: PreferenceFormPropsType) {
    const navigate = useNavigate();

    const API = new PreferenceAPI();

    async function createPreference() {
        if (!FormHelper.ValidateForm()) return false;

        await PreferenceAPI.prototype.create({
            name,
            value
        }).then( data => {
            navigate("/configurations/preferences", { state: { alert: data.message, alertType: 'success' } });
        });
    }

    async function editPreference() {
        if (!FormHelper.ValidateForm()) return false;

        await API.edit({
            slug: props.preference!.slug,
            name: props.preference!.name,
            value: value
        }).then( data => {
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
