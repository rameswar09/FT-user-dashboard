import React, { Component } from 'react'
import Header from './Header'
import Modal from './Modal'
import { connect } from 'react-redux'
import * as appActions from '../store/actions/appActions'

const _ = require('lodash')

class Home extends Component {

    state = {
        isModalView: false,
        userId: ""
    }
    handleCloseModal = () => {
        this.setState({
            isModalView: !this.state.isModalView
        })
    }
    handleOpenModal = (id) => {
        this.setState({
            userId: id,
            isModalView: !this.state.isModalView
        })
    }
    componentDidMount() {
        this.props.getAllUserData()
    }
    render() {

        let userCard = !_.isEmpty(this.props.usersData) ? _.map(this.props.usersData, (each) => <div className="user-details" onClick={(e) => this.handleOpenModal(each.id)}>{each.real_name}</div>) : null
        return (
            <div className="home">
                <Header />
                <div className="content-wrapper">
                    <div className="content">
                        {userCard}
                    </div>
                </div>
                {this.state.isModalView ? <Modal userId={this.state.userId} modalView={this.handleCloseModal} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.app.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUserData: () => dispatch(appActions.getALlUsersData()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)