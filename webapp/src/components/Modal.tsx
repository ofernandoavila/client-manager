import { ReactNode, useEffect, useState } from "react";
import { Button, Modal as BootstrapModal } from "react-bootstrap";

export interface ModalPropsType {
    text?: string;
    isOpen: boolean;
    title: string;
    onConfirmLabel?: string;
    onCancelLabel?: string;
    onConfirm?: any;
    onEdit?: any;
    onEditLabel?: string;
    editing?: boolean;
    onCancel?: any;
    content?: boolean;
    children?: ReactNode;
    size?: "sm" | "lg" | "xl" | undefined;
}

export default function Modal (props: ModalPropsType) {
    const [isOpen, setIsOpen] = useState(false);

    const HandleCloseModal = (event: any) => {
        event.preventDefault();
        if(props.onCancel) {
            props.onCancel(false);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (props.isOpen != null && props.isOpen != undefined) {
            setIsOpen(props.isOpen);
        }
    },[props.isOpen]);

    if(props.children !== undefined && props.children !== null) {
        return (
            <BootstrapModal size={props.size} show={isOpen} centered aria-labelledby="contained-modal-title-vcenter">
                <BootstrapModal.Header>
                    <BootstrapModal.Title>{ props.title }</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>{ props.children }</BootstrapModal.Body>
                <BootstrapModal.Footer>
                    <Button variant="secondary" onClick={HandleCloseModal}>{ props.onCancelLabel ?? 'Close' }</Button>
                    { props.editing ? 
                    ( <Button variant="primary" onClick={props.onEdit}>{ props.onEditLabel ?? 'Ok' }</Button> ) : 
                    ( props.onConfirm ? ( <Button variant="primary" onClick={props.onConfirm}>{ props.onConfirmLabel ?? 'Ok' }</Button> ) : '' )
                }</BootstrapModal.Footer>
            </BootstrapModal>
        );
    }
    
    return (
        <BootstrapModal show={isOpen} centered aria-labelledby="contained-modal-title-vcenter">
            <BootstrapModal.Header>
            <BootstrapModal.Title>{ props.title }</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>{ props.text }</BootstrapModal.Body>
            <BootstrapModal.Footer>
                { props.onCancel != null ? 
                    ( <Button variant="secondary" onClick={props.onCancel}>{ props.onCancelLabel ?? 'Ok' }</Button> ) : 
                    ( props.onConfirm ? ( <Button variant="secondary" onClick={props.onConfirm}>{ props.onConfirmLabel ?? 'Ok' }</Button> ) : '' )
                }
                { props.editing ? 
                    ( <Button variant="primary" onClick={props.onEdit}>{ props.onEditLabel ?? 'Ok' }</Button> ) : 
                    ( props.onConfirm ? ( <Button variant="primary" onClick={props.onConfirm}>{ props.onConfirmLabel ?? 'Ok' }</Button> ) : '' )
                }
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
}