import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [
    /*{
        id:1,
        msg:'Please log in',
        alertType: 'success'
    } it ll be like this */
    
];


export default function(state = initialState, action){
    const { type, payload } = action; //instead of action.type or action.payload

    switch(type) {
        //these constants are from types.js
        case SET_ALERT:
            return [...state, payload]; //sending the already present state and the payload which contains the msg id alertype
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload); //filtering the alert, now payload is the id
        default:
            return state;
    }
}