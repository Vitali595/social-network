import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type PathParamType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}

type ProfileContainerType = MapStateToPropsType & mapDispatchToPropsType

type ProfileContainerPropsType = RouteComponentProps<PathParamType> & ProfileContainerType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }
        this.props.getUserProfile(+userId)
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={"login"}/>
        }

        return (
            <Profile profile={this.props.profile}/>
        )
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);