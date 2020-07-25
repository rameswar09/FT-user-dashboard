import { users } from '../../task/user'
import * as actionTypes from '../actions/actionTypes'
const _ = require('lodash')
let initialState = {
    userData: [],
    modalData:[]
}

const setUserData = (state) => {
    let finalState = { ...state }
    finalState.userData = users
    return finalState
}
const setModalData = (state,userId) => {
    let finalState = { ...state }
    let modalData = _.find(users,{id:userId})
    finalState.modalData=modalData
    return finalState
}
const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.GET_ALL_USER_DATA) {
        return setUserData(state)
    }
    if (action.type === actionTypes.GET_MODAL_DATA) {
        return setModalData(state,action.data)
    }
    return state
}

export default reducer