import React from "react";
import s from "./Paginator.module.css";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {totalUsersCount, pageSize, currentPage, onPageChanged}
) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span key={p} className={currentPage === p ? s.selectedPage : ""}
                         onClick={(e) => {
                             onPageChanged(p)
                         }}
            >{p}</span>
        })}
    </div>
}