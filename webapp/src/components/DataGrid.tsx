import { MouseEventHandler, useEffect, useState } from "react";
import useFormatter from "../helpers/Formatter";
import { GenericObjectType } from "../types/ContextTypes";
import Modal from "./Modal";
import { useOperations } from "./GroupOperations";

interface DataGridProps<T> extends GenericObjectType {
    objects: T[];
    config: DataGridConfigs;
    options?: DataGridPropsOptions;
}

interface DataGridConfigs {
    singularName: string;
    pluralName: string;
}

interface DataGridPropsOptions {
    formatProperty?: FormatProperty[];
    ignoreProperties?: string[];
}

interface FormatProperty {
    property: string;
    type: "currency" | "string";
    stringFormat?: StringFormatProperty;
}

interface StringFormatProperty {
    format: string;
    valuesKeys: string[];
}

export default function DataGrid<T extends GenericObjectType>(
    props: DataGridProps<T>
) {
    const { Currency, StringFormatter, CamelToString } = useFormatter();
    const [keys, setKeys] = useState<string[]>([]);
    const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
    const { NewItem } = useOperations<T>();
    const [ current, setCurrent ] = useState<T>();

    function Toggle(event: any) {
        event.preventDefault();
        setIsNewOpen(true);
    }

    const onCreateItem = (event: any) => {
        setIsNewOpen(false);
        console.log('onCreate called');
    }

    const onEditItem = (event: any) => {
        setIsEditOpen(false);
        console.log('onEdit called');
    }

    const onView = (event: any) => {
        setIsViewOpen(false);
        console.log('onView called');
    }

    useEffect(() => {
        if (props.objects[0] !== null && props.objects[0] !== undefined) {
            setKeys(Object.keys(props.objects[0]));
        }
    }, [props.objects]);

    if (props.objects.length === 0 || keys.length === 0)
        return <span>There is no data to show</span>;
    if (props.objects == null || props.objects == undefined)
        return <span>There is no data to show</span>;

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">{ props.config.pluralName }</h1>
                <button className="btn btn-primary" onClick={event => Toggle(event)}>
                    Create new { props.config.singularName }
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        { keys.map((key) => {
                            if (
                                props.options !== null &&
                                props.options !== undefined
                            ) {
                                if (
                                    props.options.ignoreProperties !== null &&
                                    props.options.ignoreProperties !== undefined &&
                                    props.options.ignoreProperties.length > 0
                                ) {
                                    let ignoreProperty;
                                    props.options.ignoreProperties.forEach(
                                        (ignore) => {
                                            if (key == ignore) {
                                                ignoreProperty = true;
                                                return;
                                            }
                                        }
                                    );
                                    if (ignoreProperty) return;
                                }
                            }

                            if(key == 'id') key = '#';

                            return <th key={key}>{CamelToString(key)}</th>;
                        })}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.objects.map((item, i) => (
                        <tr key={i}>
                            {keys.map((key) => {
                                let value = item[key];

                                if (
                                    props.options !== null &&
                                    props.options !== undefined
                                ) {
                                    if (
                                        props.options.ignoreProperties !== null &&
                                        props.options.ignoreProperties !==
                                            undefined &&
                                        props.options.ignoreProperties.length > 0
                                    ) {
                                        let ignoreProperty;
                                        props.options.ignoreProperties.forEach(
                                            (ignore) => {
                                                // console.log(`comparing ${key} to ${ignore} : ${key == ignore}`);
                                                if (key == ignore) {
                                                    ignoreProperty = true;
                                                    return;
                                                }
                                            }
                                        );
                                        if (ignoreProperty) return <></>;
                                    }

                                    if (
                                        props.options.formatProperty !== null &&
                                        props.options.formatProperty !==
                                            undefined &&
                                        props.options.formatProperty.length > 0
                                    ) {
                                        if (
                                            props.options.formatProperty.find(
                                                (prop) => prop.property === key
                                            ) !== undefined
                                        ) {
                                            switch (
                                                props.options.formatProperty.find(
                                                    (prop) => prop.property === key
                                                )?.type
                                            ) {
                                                case "currency":
                                                    value = Currency(value);
                                                    break;

                                                case "string":
                                                    let formatter =
                                                        props.options.formatProperty.find(
                                                            (prop) =>
                                                                prop.property ===
                                                                key
                                                        )!;
                                                    value = StringFormatter(
                                                        formatter.stringFormat!
                                                            .format,
                                                        item,
                                                        formatter.stringFormat!
                                                            .valuesKeys
                                                    );
                                                    break;
                                            }
                                        }
                                    }
                                }

                                return <td key={key}>{value}</td>;
                            })}
                            <th>
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secundary"
                                        onClick={() => setIsViewOpen(!isViewOpen)}
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secundary"
                                        onClick={() => setIsEditOpen(!isEditOpen)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secundary"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <Modal size="lg" isOpen={isViewOpen} onCancel={onView} onCancelLabel="Cancel" title={ props.config.singularName }>
                                    { Object.keys(item).map( key => {
                                        return <p>{key}: { item[key] }</p>;
                                    }) }
                                </Modal>
                                <Modal isOpen={isEditOpen} onCancel={onEditItem} onCancelLabel="Discart changes" title={ props.config.singularName }>
                                    { Object.keys(item).map( key => {
                                        return <p>{key}: { item[key] }</p>;
                                    }) }
                                </Modal>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isNewOpen} onConfirm={onCreateItem} title={"New " + props.config.singularName} />
            
        </>
    );
}
