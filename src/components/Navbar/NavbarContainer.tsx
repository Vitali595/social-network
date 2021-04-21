import React from 'react';
import Navbar from "./Navbar";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {FriendType, SidebarType} from "../../redux/sidebar-reducer";

export type MapStateSidebarType = {
    state: SidebarType
}

const mapStateToProps = (state: AppStateType): MapStateSidebarType => {
    return {
        state: state.sidebar
    }
}

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer;