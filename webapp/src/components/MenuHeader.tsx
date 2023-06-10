import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenuHeader() {

    const [title, setTitle] = useState('Client Manager');

    return(
        <div className="navbar navbar-dark bg-dark text-light shadow-sm sticky-top">
            <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
                <Link className="p-2 text-decoration-none text-white" to={'/'}><strong>{ title }</strong></Link>
            </a>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-decoration-none text-white" to={'/clients'}>Clients</Link>
                <Link className="p-2 text-decoration-none text-white" to={'/orders'}>Orders</Link>
                <Link className="p-2 text-decoration-none text-white" to={'/configurations'}>Configurations</Link>
            </nav>
            </div>
        </div>
    );
}