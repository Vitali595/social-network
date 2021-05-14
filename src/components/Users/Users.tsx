import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: number[]
}

export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} className={props.currentPage === p ? s.selectedPage : ""}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id}>
    <span>
        <div>
            <NavLink to={"/profile/" + u.id}>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
            </NavLink>

    </div>
    <div>
    {u.followed
        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
            props.toggleFollowingProgress(true, u.id)
            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                withCredentials: true,
                headers: {
                    "API-KEY": "53851d56-7a44-40e6-8b13-57af236b0ce4"
                }
            })
                .then(response => {
                    if (response.data.resultCode === 0) {
                        props.unfollow(u.id)
                    }
                    props.toggleFollowingProgress(false, u.id)
                })
        }}>Unfollow</button>
        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
            props.toggleFollowingProgress(true, u.id)
            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                withCredentials: true,
                headers: {
                    "API-KEY": "53851d56-7a44-40e6-8b13-57af236b0ce4"
                }
            })
                .then(response => {
                    if (response.data.resultCode === 0) {
                        props.follow(u.id)
                    }
                    props.toggleFollowingProgress(false, u.id)
                })
        }}>Follow</button>}
        </div>
        </span>
            <span>
        <span>
            <div>{u.name}</div>
        <div>{u.status}</div>
        </span>
        <span>
        <div>{"u.location.country"}</div>
        <div>{"u.location.city"}</div>
        </span>
        </span>
        </div>)}
    </div>
}