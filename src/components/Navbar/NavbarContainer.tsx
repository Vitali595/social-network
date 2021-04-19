import React from 'react';
import {StoreType} from "../../redux/store";
import Navbar from "./Navbar";
import StoreContext from "../../StoreContext";

type NavbarContainerPropsType = {
    store: StoreType
}

const NavbarContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState().sidebar

                return <Navbar state={state}/>
            }
            }
        </StoreContext.Consumer>
    )
}

export default NavbarContainer;