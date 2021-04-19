import React from 'react';
import {StoreType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from '../../StoreContext';

type DialogsContainerPropsType = {
    store: StoreType
}

const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState().dialogsPage

                let onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }

                let onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }

                return <Dialogs
                    updateNewMessageBody={onNewMessageChange}
                    onSendMessage={onSendMessageClick}
                    dialogsPage={state}/>
            }
        }
        </StoreContext.Consumer>

    )
}

export default DialogsContainer;