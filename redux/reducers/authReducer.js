import { REGISTER_MEMBER_SUCCESS, LOGIN_MEMBER_SUCCESS } from "../actions/authActions";

const initialState = {
    member: {},
    errors: {}
}

export default function (state = initialState, action){

    switch(action.type){
        
        case REGISTER_MEMBER_SUCCESS:
            console.log('enter');
            return {
                ...state,
                member:action.payload
            }

        case LOGIN_MEMBER_SUCCESS:
            return {
                ...state,
                member:action.payload
            };
    }

    return state;
}