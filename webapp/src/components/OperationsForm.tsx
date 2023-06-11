import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import useFormatter from "../helpers/Formatter";
import { GenericObjectType, Preference } from "../types/ContextTypes";
import Modal from "./Modal";
import { FeatureManagerTabs } from "../views/features/manager/FeatureManagerTabs";

interface OperationsFormProps<T> extends GenericObjectType {
    object: T;
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

    return (
        <form action="">
            {Object.entries(props.object).map(([key, value]) => (
                <div key={key}>
                    <label htmlFor={key}>{key}</label>
                    <input
                    type="text"
                    id={key}
                    name={key}
                    value={props.object[key] || ''}
                    onChange={HandleChanges}
                    />
                </div>
            ) ) }
        </form>
    );
}
