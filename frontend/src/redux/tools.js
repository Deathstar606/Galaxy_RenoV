import * as ActionTypes from "./ActionTypes"

export const Tools = (state = { 
    isLoading: true,
    errMess: null,
    tool:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TOOL:
            return {...state, isLoading: false, errMess: null, tool: action.payload};

        case ActionTypes.TOOL_LOADING:
            return {...state, isLoading: true, errMess: null, tool: []}

        case ActionTypes.TOOL_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};