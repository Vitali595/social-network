import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';

type PathParamType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

type ProfileContainerType = MapStateToPropsType & mapDispatchToPropsType

type ProfileContainerPropsType = RouteComponentProps<PathParamType> & ProfileContainerType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);