import * as actionsTypes from '../actions/actionTypes'

export const getALlUsersData = () => {
    return {
        type: actionsTypes.GET_ALL_USER_DATA
    }
}
export const getModalData = data => {
    return {
        type: actionsTypes.GET_MODAL_DATA,
        data
    }
}