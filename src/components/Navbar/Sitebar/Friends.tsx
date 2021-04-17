import React from "react";
import s from "./Sitebar.module.css";

type FriendsPropsType = {
    name: string
}

export const Friends = (props: FriendsPropsType) => {
    return (
        <div className={s.nav}>
            <span className={s.item}>
                <img src='https://pbs.twimg.com/profile_images/913636623300141056/58jmo4Ok.jpg' />
                <span className={s.name}>{props.name}</span>
            </span>
        </div>
    )
}