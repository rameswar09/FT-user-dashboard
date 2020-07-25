import React, { Component } from 'react'
import '../css/home.css'
import Calendar from '../Components/Calendar'
import { connect } from 'react-redux'
import * as appActions from '../store/actions/appActions'
const _ = require('lodash')
const moment = require('moment')

class Modal extends Component {
    state = {
        selectedDate: moment(new Date()).zone("+0530").format('YYYY-MM-DD'),
        selectedDateShow: moment(new Date()).zone("+0530").format("dddd, MMMM Do YYYY")
    }
    userId = this.props.userId
    // userDetails = _.find(userData, { id: this.userId })

    componentDidMount() {
        this.props.getModalData(this.userId)
    }
    handleChangeTheDate = (e) => {
        let dateString = moment(new Date(e.target.value)).zone("+0530").format("dddd, MMMM Do YYYY")
        dateString = dateString !== "Invalid date" ? dateString : "All Active Time"
        e.target.value = dateString !== "Invalid date" ? e.target.value : ""

        this.setState({
            selectedDate: e.target.value,
            selectedDateShow: dateString
        })
    }
    handleChangeShowAll = () => {
        this.setState({
            selectedDate: "",
            selectedDateShow: "All Active Time"
        })
    }
    render() {
        let activityPeriod = this.props.modalData.activity_periods
        let activeTime = null
        if (!_.isEmpty(activityPeriod)) {
            if (!_.isEmpty(this.state.selectedDate)) {
                activeTime = _.map(activityPeriod, (each) => {
                    if (each.date === this.state.selectedDate) {
                        return <div><p>Start Time:{each.start_time}</p><p>End Time:{each.end_time}</p></div>
                    }
                })
                activeTime=_.compact(activeTime)
                activeTime = !_.isEmpty(activeTime) ? activeTime : <div><p>No active time for the day</p></div>
            } else {
                activeTime = _.map(activityPeriod, (each) => <div><p>Start Time: {each.start_time}</p><p>End Time: {each.end_time}</p></div>)
            }
        }
        return (
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="close" onClick={this.props.modalView}>&times;</div>
                    <div class="user-name">
                        {this.props.modalData.real_name}
                    </div>
                    <div class="user-details-wrapper">
                        <div class="calendar-section">
                            <Calendar changeDate={(e) => this.handleChangeTheDate(e)} />
                            
                            <button onClick={this.handleChangeShowAll}>Show All Active Month</button>
                        </div>
                        <div class="user-activity-details">

                            <p>{this.state.selectedDateShow}</p>

                            <div className="activity-content">
                                {activeTime}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        modalData: state.app.modalData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getModalData: (userId) => dispatch(appActions.getModalData(userId)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
