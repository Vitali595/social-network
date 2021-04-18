import {ActionsTypes, DialogsPageType, MessageType} from "./store";

export const SEND_MESSAGE = "SEND-MESSAGE"
export const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"

let initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-incubator?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageBody: ""
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body: MessageType = {
                id: 6,
                message: state.newMessageBody
            }
            state.messages.push(body)
            state.newMessageBody = ""
            return state
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        default:
            return state
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const

export const updateNewMessageBodyCreator = (text: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
}) as const

export default dialogsReducer