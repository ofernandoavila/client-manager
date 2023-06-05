import BasicView from "../BasicView";
import ConfigurationsMenu from "./ConfigurationsMenu";

export interface ConfigurationsPropsType {
    children: any;
    currentMenu: string;
}

export default function ConfigurationsBasicView(props: ConfigurationsPropsType) {
    const menu = [
        {
            label: "Configurations",
            path: '/configurations'
        },
        {
            label: "Preferences",
            path: '/configurations/preferences'
        }, {
            label: "Users",
            path: '/configurations/users'
        }
    ];

    return (
        <BasicView>
            <h1>Configurations</h1>
            <div className="row">
                <div className="col-sm-2 pt-5">
                    <ConfigurationsMenu menu={menu} current={props.currentMenu}/>
                </div>
                <div className="col-sm pt-5">
                    { props.children }
                </div>
            </div>
        </BasicView>
    );
}