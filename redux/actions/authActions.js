export const REGISTER_MEMBER_SUCCESS = 'REGISTER_MEMBER_SUCCESS';
export const REGISTER_MEMBER_FAIL = 'REGISTER_MEMBER_FAIL';
export const LOGIN_MEMBER_SUCCESS= "LOGIN_MEMBER_SUCCESS";
export const LOGIN_MEMBER_FAIL = "LOGIN_MEMBER_FAIL";

export const registerMember = authData => {
    const {name,email, password} = authData;
    
    return async dispatch => {
        //logic to make a post to create the member
       dispatch({
           type: REGISTER_MEMBER_SUCCESS,
           payload:1
       });
    };
};

export const loginMember = authData => {
    const {email, password} = authData;
    
    return async dispatch => {
        //logic to make a post to LOGIN the member
       dispatch({
           type: REGISTER_MEMBER_SUCCESS,
           playload:1
       });
    };
};