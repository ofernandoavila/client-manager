import { MouseEventHandler, useEffect, useState } from "react";
import useFormatter from "../helpers/Formatter";
import { GenericObjectType, Preference } from "../types/ContextTypes";
import Modal from "./Modal";
import { FeatureManagerTabs } from "../views/features/manager/FeatureManagerTabs";
import OperationsForm from "./OperationsForm";

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
    formOptions?: DataGridFormOptions;
}

interface DataGridFormOptions {
    new?: string[];
    edit?: string[];
    removeOnNew?: string[];
    removeOnEdit?: string[];
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
    const [ current, setCurrent ] = useState<T>();

    function OpenModal(event: any, obj: T | null, modal: string) {
        event.preventDefault();
        if(obj != null) setCurrent(obj);

        switch(modal) {
            case "new":
                setIsNewOpen(true);
                break;
            case "edit":
                setIsEditOpen(true);
                break;
            case "view":
                setIsViewOpen(true);
                break;
        }
    }

    const CloseModal = () => {
        setIsNewOpen(false);
        setIsEditOpen(false);
        setIsViewOpen(false);
    }

    useEffect(() => {
        if (props.objects[0] !== null && props.objects[0] !== undefined) {
            setKeys(Object.keys(props.objects[0]));
        }
    }, [props.objects]);

    if (props.objects.length === 0 || keys.length === 0 || props.objects == null || props.objects == undefined)
        return <span>There is no data to show</span>;

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h1 className="">{ props.config.pluralName }</h1>
                <button className="btn btn-primary" onClick={event => OpenModal(event, null, 'new')}>
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
                                        onClick={(event) => OpenModal(event, item, 'view')}
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secundary"
                                        onClick={(event) => OpenModal(event, item, 'edit')}
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
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Modal size="lg" isOpen={isNewOpen} onCancel={CloseModal} onCancelLabel="Cancel" title={ props.config.singularName }>
                <OperationsForm
                    sectionName={props.config.singularName}
                    object={current!}
                    formType="new"
                    options={{ 
                        newFormFields: props.options?.formOptions?.new,
                        removeFromNewFormFields: props.options?.formOptions?.removeOnNew  
                    }}
                />
            </Modal>
            <Modal size="lg" isOpen={isViewOpen} onCancel={CloseModal} onCancelLabel="Cancel" title={ props.config.singularName }>
                { current != null ? Object.entries(current).map( ([key, value]) => {
                    return (
                        <div className="row">
                            <div className="col-sm-3">
                                <p>{ CamelToString(key) }</p>
                            </div>
                            <div className="col-sm-9">
                                <p>{ value }</p>
                            </div>
                        </div>
                    );
                }): '' }
            </Modal>
            <Modal size="lg" isOpen={isEditOpen} onCancel={CloseModal} onCancelLabel="Discart changes" title={ props.config.singularName }>
                <OperationsForm
                    sectionName={props.config.singularName}
                    object={current!}
                    formType="edit"
                    options={{ 
                        editFormFields: props.options?.formOptions?.edit,
                        removeFromEditFormFields: props.options?.formOptions?.removeOnEdit  
                    }}
                />
            </Modal>
        </>
    );
}
