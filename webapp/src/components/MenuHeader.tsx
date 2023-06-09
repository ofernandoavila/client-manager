import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PreferencesHelper } from '../helpers/PreferencesHelper';
import { usePreference } from '../hooks/usePreference';

export default function MenuHeader() {

    const { GetPreferenceValue } = usePreference();

    return(
        <div className="navbar navbar-dark bg-dark text-light shadow-sm sticky-top">
            <div className="container d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center">
                <Link className="p-2 text-decoration-none text-white" to={'/'}><strong>{ GetPreferenceValue('corporation-name') ?? "Company Manager" }</strong></Link>
            </div>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-decoration-none text-white" to={'/clients'}>Clients</Link>
                <Link className="p-2 text-decoration-none text-white" to={'/orders'}>Orders</Link>
                <Link className="p-2 text-decoration-none text-white" to={'/configurations'}>Configurations</Link>
            </nav>
            </div>
        </div>
    );
}