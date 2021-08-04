export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-incubator?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof sendMessageCreator>

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "samurai-network/dialogs/SEND_MESSAGE":
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 8, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody: string) => (
    {type: "samurai-network/dialogs/SEND_MESSAGE", newMessageBody}) as const