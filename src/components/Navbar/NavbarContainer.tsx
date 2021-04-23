import React from 'react';
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {SidebarType} from "../../redux/sidebar-reducer";

type mapStateToPropsType = {
    state: SidebarType
}

export type SidebarPropsType = mapStateToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        state: state.sidebar
    }
}

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer;