import React from 'react';
import {InitialStateType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from 'redux';

export type MapStatePropsType = {
    dialogsPage: InitialStateType
}

export type MapDispatchPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
      dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs)

export default DialogsContainer;