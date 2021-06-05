import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    login: null
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
    }


}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);