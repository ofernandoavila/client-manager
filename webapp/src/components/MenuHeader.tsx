export default function MenuHeader() {
    return(
        <div className="navbar navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
                <strong>Client Manager</strong>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            </div>
        </div>
    );
}