import React from "react";
import {StoreType} from "./redux/store";

const StoreContext = React.createContext({} as StoreType)

type ProviderPropsType = {
    store: StoreType
    children: React.ReactNode
}

export const Provider = (props: ProviderPropsType) => {
    return (
    <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
    )
}

export default StoreContext