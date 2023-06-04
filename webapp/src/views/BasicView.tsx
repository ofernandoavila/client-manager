import { useState } from "react";
import MenuHeader from "../components/MenuHeader";

interface BasicViewType {
    children: any;
}

export default function BasicView(props: BasicViewType) {
    
    return (
        <>
            <MenuHeader />
            <main role="main ">
                <div className="container pt-5">
                    { props.children ?? '' }
                </div>
            </main>
        </>
    );
}