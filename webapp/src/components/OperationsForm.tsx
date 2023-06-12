import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import useFormatter from "../helpers/Formatter";
import { GenericObjectType, Preference } from "../types/ContextTypes";
import Modal from "./Modal";
import { FeatureManagerTabs } from "../views/features/manager/FeatureManagerTabs";
import InputText from "../forms/components/InputText";
import InputBoolean from "../forms/components/InputBoolean";

interface OperationsFormProps<T> extends GenericObjectType {
    object: T;
    formType: "new" | "edit";
    sectionName: string;
    options?: OperationsOptions;
}

interface OperationsOptions {
    newFormFields?: string[];
    editFormFields?: string[];
    removeFromNewFormFields?: string[];
    removeFromEditFormFields?: string[];
}

interface FormItem {
    key: string;
    value: string | number | boolean;
    type: string | number | boolean;
    group?: string;
}

export default function OperationsForm<T extends GenericObjectType>(
    props: OperationsFormProps<T>
) {
    const { Currency, StringFormatter, CamelToString } = useFormatter();

    const [initial, setInitial] = useState<T>();
    const [current, setCurrent] = useState<T>();
    const [formData, setFormData] = useState<GenericObjectType>({});

    const HandleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }) )
    }

    if (props.object === undefined)
        return <></>;

    
    switch(props.formType) {
        case "new":
            if(props.options?.removeFromNewFormFields !== undefined) {
                return (
                    <form>
                        {
                            Object.entries(props.object).map(([key, value]) => {
                                let removed = false;
                                props.options?.removeFromNewFormFields?.map( remove => {
                                    if (key === remove) {
                                        removed = true;
                                        return;
                                    }
                                } )

                                if (removed) return <></>;

                                switch(typeof value) {
                                    case 'boolean':
                                            return <InputBoolean name={key} HandleChanges={HandleChanges} />
                                    default:
                                        return <InputText sectionName={props.sectionName} name={key} HandleChanges={HandleChanges} />
                                }
                            })
                        }
                    </form>
                );
            } else {
                if(props.options?.newFormFields !== undefined) {
                    return (
                        <form>
                            {
                                props.options.newFormFields.map( key => {
                                    switch(typeof props.object[key]) {
                                        case 'boolean':
                                            return <InputBoolean name={key} HandleChanges={HandleChanges} />
                                        default:
                                            return <InputText sectionName={props.sectionName} name={key} HandleChanges={HandleChanges} />
                                    }
                                })
                            }
                        </form>
                    );
                } else {
                    return (
                        <form>
                            {
                                Object.entries(props.object).map(([key, value]) => {
                                    switch(typeof value) {
                                        case 'boolean':
                                            return <InputBoolean name={key} HandleChanges={HandleChanges} />
                                        default:
                                            return <InputText sectionName={props.sectionName} name={key} HandleChanges={HandleChanges} />
                                    }
                                })
                            }
                        </form>
                    )
                }
            }
        
        case "edit":
            if(props.options?.removeFromEditFormFields !== undefined) {
                return (
                    <form>
                        {
                            Object.entries(props.object).map(([key, value]) => {
                                let removed = false;
                                props.options?.removeFromEditFormFields?.map( remove => {
                                    if (key === remove) {
                                        removed = true;
                                        return;
                                    }
                                } )

                                if (removed) return <></>;

                                switch(typeof value) {
                                    case 'boolean':
                                        return <InputBoolean name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                    default:
                                        return <InputText sectionName={props.sectionName} name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                }
                            })
                        }
                    </form>
                );
            } else {
                if(props.options?.editFormFields !== undefined) {
                    return (
                        <form>
                            {
                                props.options.editFormFields.map( key => {
                                    switch(typeof props.object[key]) {
                                        case 'boolean':
                                            return <InputBoolean name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                        default:
                                            return <InputText sectionName={props.sectionName} name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                    }
                                })
                            }
                        </form>
                    );
                } else {
                    return (
                        <form>
                            {
                                Object.entries(props.object).map(([key, value]) => {
                                    switch(typeof value) {
                                        case 'boolean':
                                            return <InputBoolean name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                        default:
                                            return <InputText sectionName={props.sectionName} name={key} value={props.object[key]} HandleChanges={HandleChanges} />
                                    }
                                })
                            }
                        </form>
                    )
                }
            }
    }
}

