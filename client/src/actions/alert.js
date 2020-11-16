import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from "uuid"; //for ids in alerts

export const setAlert = (msg, alertType, timeout = 2000) => dispatch => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, alertType, id }}); //calling SET_ALERT
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //calling REMOVE_ALERT
};