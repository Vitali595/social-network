export type FriendType = {
    id: number
    name: string
}

export type SidebarType = {
    friends: Array<FriendType>
}


const initialState: SidebarType = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Valera'}
    ]
}
type ActionsType = {}

export const sidebarReducer = (state: SidebarType = initialState, action: ActionsType) => {

    return state
}