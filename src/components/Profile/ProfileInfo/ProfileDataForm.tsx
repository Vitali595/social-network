import React from "react";
import s from './ProfileInfo.module.css';
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import styles from "../../../common/FormsControls/FormsControls.module.css";

type ProfileDataFormType = {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType>> = ({handleSubmit, error}) => {

    const {profile} = useSelector((state: AppStateType) => state.profilePage)

    return <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
        {error && <div className={styles.formSummeryError}>
            {error}
        </div>}
            <div>
                <b>Full name</b>: {createField("Full name", "fullName", Input, [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField("", "lookingForAJob", Input, [], {type: "checkbox"})}
            </div>

            <div>
                <b>My professional
                    skills</b>: {createField("My professional skills", "lookingForAJobDescription", Textarea, [])}
            </div>

            <div>
                <b>About me</b>: {createField("About me", "aboutMe", Textarea, [])}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts." + key, Input, [])}</b>
                </div>
            })}
            </div>
        </form>
}

export const ProfileDataFormReduxForm = reduxForm<ProfileDataFormType>({form: "edit-profile"})(ProfileDataForm)