import { Link } from "react-router-dom";

export interface ConfigurationMenuItemType {
    label: string;
    path: string;
}

export interface ConfigurationsMenuPropsType {
    menu: Array<ConfigurationMenuItemType>;
    current?: string;
}

export default function ConfigurationsMenu(props: ConfigurationsMenuPropsType) {
    return (
        <ul className="nav flex-column">
            {
                props.menu.map((item, index) => {
                    return (
                        <Link to={item.path} key={index} className={item.label === props.current ? "nav-link active" : "nav-link"}>
                            {item.label}
                        </Link>
                    )
                    
                })
            }
        </ul>
    );
}