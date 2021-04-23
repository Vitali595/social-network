import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Friends} from "./Sidebar/Friends";
import {SidebarPropsType} from "./NavbarContainer";


const Navbar = (props: SidebarPropsType) => {

    let myFriends = props.state.friends.map(f => <Friends key={f.id} name={f.name}/>)

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