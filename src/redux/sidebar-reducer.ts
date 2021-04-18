import {ActionsTypes, SidebarType} from "./store";

let initialState: SidebarType = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Valera'}
    ]
}

const sidebarReducer = (state: SidebarType = initialState, action: ActionsTypes) => {

    return state
}

export default sidebarReducer