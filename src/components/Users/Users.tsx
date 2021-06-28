import React from "react";
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const Users: React.FC<UsersPropsType> = (
    {
        totalUsersCount, pageSize, currentPage, onPageChanged,
        users, follow, unfollow, followingInProgress, ...props
    }
) => {

    return <div>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>
        <div>
            {users.map(u => <User user={u} follow={follow} unfollow={unfollow}
                                  followingInProgress={followingInProgress} key={u.id}/>)}
        </div>
    </div>
}