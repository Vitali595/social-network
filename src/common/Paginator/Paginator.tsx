import React, {useState} from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}
) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p} className={cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber)}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                >{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</button>}
    </div>
}