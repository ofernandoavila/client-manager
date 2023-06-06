import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Currency } from "../../../types/ContextTypes";
import { CurrencyAPI } from "../../../helpers/Api";
import { FormHelper } from "../../../helpers/FormHelper";
import Modal from "../../../components/Modal";

interface CurrencyGridPropsType {
    onAlert?: any;
    onAlertStatus?: any;
    onFetch?: any;
}

export default function CurrencyGrid(props: CurrencyGridPropsType) {

    const [currencies, setCurrencies] = useState<Currency[]>();
    const [openCurrency, setOpenCurrency ] = useState(false);
    const [editMode, setEditMode ] = useState(false);

    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [slug, setSlug] = useState<string>('');

    const Api = new CurrencyAPI();

    const fetchData = async () => {
        return await Api.getAll()
            .then(data => {
                setCurrencies(data.currencies!);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    function OpenModal(edit: boolean = false, currency: Currency | null = null) {
        if(currency) {
            setEditMode(edit);
            setName(currency.name);
            setSymbol(currency.symbol!);
            setSlug(currency.slug!);
        }
        setOpenCurrency(!openCurrency);
    }

    async function DeleteItem(slug: string) {
        return await Api.delete(slug)
            .then(data => {
                props.onAlert(data.message);
                props.onAlertStatus('danger');
                fetchData();
            });
    }
    

    const HandleSaveCurrency = async (event: any) => {
        event.preventDefault();

        if(!FormHelper.ValidateForm()) return;

        let currency: Currency = {
            name, symbol
        }

        await Api.create(currency)
            .then(data => {
                if(data.error) {
                    props.onAlert(data.error.code + " - " + data.error.message);
                    props.onAlertStatus('danger');
                    return;
                }

                setOpenCurrency(false);
                props.onAlert(data.message);
                props.onAlertStatus('success');
                fetchData();
            });
    }

    const HandleEditCurrency = async (event: any) => {
        event.preventDefault();

        if(!FormHelper.ValidateForm()) return;

        let currency: Currency = {
            name, symbol, slug
        }

        await Api.edit(currency)
            .then(data => {
                if(data.error) {
                    props.onAlert(data.error.code + " - " + data.error.message);
                    props.onAlertStatus('danger');
                    return;
                }

                setOpenCurrency(false);
                props.onAlert(data.message);
                props.onAlertStatus('success');
                fetchData();
            });
    }
    

    if(!currencies) return (<></>);

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3>Currencies</h3>
                <button className="btn btn-primary" onClick={event => setOpenCurrency(!openCurrency)}>Create new currency</button>   
            </div>
            {  currencies.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { currencies.map( item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{ item.name }</td>
                                <td>{ item.symbol }</td>
                                <td>{ item.slug }</td>
                                <td>
                                    <div className="btn-group">
                                        <button type="button" onClick={ (event) => OpenModal(true, item)} className="btn btn-sm btn-outline-secundary">Edit</button>
                                        { !item.isFromSystem ? <button type="button" onClick={() => DeleteItem(item.slug!)} className="btn btn-sm btn-outline-secundary">Delete</button> : '' }
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                    <Modal 
                        size="lg"
                        isOpen={openCurrency}
                        onConfirm={HandleSaveCurrency}
                        onEdit={HandleEditCurrency}
                        onCancel={setOpenCurrency}
                        text="Type your new currency"
                        type="Create new currency"
                        editing={editMode}
                        content
                    >
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={(event) => setName(event.currentTarget.value)} id="new-currency-form-name" type="text" className="form-control" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Symbol</label>
                                    <input  value={symbol} onChange={(event) => setSymbol(event.currentTarget.value)} id="new-currency-form-symbol" type="text" className="form-control" required/>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </table>
            ) : <span>There is no currencies to show</span>
        }   
        </>
    );
}