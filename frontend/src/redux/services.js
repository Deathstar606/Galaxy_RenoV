import * as ActionTypes from "./ActionTypes"

export const Services = (state = { 
    isLoading: true,
    errMess: null,
    services:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SERVICE:
            return {...state, isLoading: false, errMess: null, services: action.payload};

        case ActionTypes.SERVICE_LOADING:
            return {...state, isLoading: true, errMess: null, services: []}

        case ActionTypes.SERVICE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};