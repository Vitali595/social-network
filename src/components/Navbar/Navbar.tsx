import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Friends} from "./Sidebar/Friends";
import {SidebarType} from "../../redux/store";

type NavbarPropsType = {
    state: SidebarType
}

const Navbar = (props: NavbarPropsType) => {

    let myFriends = props.state.friends.map(f => <Friends name={f.name}/>)

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
            <div className={s.friends}>Friends</div>
                {myFriends}
        </nav>
    )
}

export default Navbar;