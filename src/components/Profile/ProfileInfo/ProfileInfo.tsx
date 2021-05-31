import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile.photos) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;