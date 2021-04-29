import React from "react";
import {UsersPropsType} from "./UsersContainer";
import s from "./Users.module.css"
import userPhoto from "../../assets/images/user.jpg";
import axios from "axios";

const Users = (props: UsersPropsType) => {

    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })
    }

    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>
                    }
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

export default Users

// [
// {
//     id: 1,
//     photoUrl: "https://pbs.twimg.com/profile_images/913636623300141056/58jmo4Ok.jpg",
//     followed: false,
//     fullName: "Met",
//     status: "I am a boss",
//     location: {city: "Minsk", country: "Belarus"}
// },
//     {
//         id: 2,
//         photoUrl: "https://pbs.twimg.com/profile_images/913636623300141056/58jmo4Ok.jpg",
//         followed: true,
//         fullName: "Sasha",
//         status: "I am a boss",
//         location: {city: "Moscow", country: "Russia"}
//     },
//     {
//         id: 3,
//         photoUrl: "https://pbs.twimg.com/profile_images/913636623300141056/58jmo4Ok.jpg",
//         followed: false,
//         fullName: "Andrew",
//         status: "I am a boss",
//         location: {city: "Kiev", country: "Ukraine"}
//     }
// ]