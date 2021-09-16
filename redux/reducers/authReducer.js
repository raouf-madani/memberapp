import { REGISTER_MEMBER_SUCCESS, LOGIN_MEMBER_SUCCESS, LOGIN_MEMBER_FAIL,REGISTER_MEMBER_FAIL } from "../actions/authActions";

const initialState = {
    member: {},
    errors: {}
}

export default function (state = initialState, action){

    switch(action.type){
        
        case REGISTER_MEMBER_SUCCESS:
         
            return {
                ...state,
                member:action.payload
            }

        case LOGIN_MEMBER_SUCCESS:
            return {
                ...state,
                member:action.payload
            };

        case LOGIN_MEMBER_FAIL:
            return {
               ...state,
               errors:action.payload

            }
        case REGISTER_MEMBER_FAIL:
        return {
            ...state,
            errors:action.payload
        }
    }

    return state;
}