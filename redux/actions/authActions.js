export const REGISTER_MEMBER_SUCCESS = 'REGISTER_MEMBER_SUCCESS';
export const REGISTER_MEMBER_FAIL = 'REGISTER_MEMBER_FAIL';
export const LOGIN_MEMBER_SUCCESS= "LOGIN_MEMBER_SUCCESS";
export const LOGIN_MEMBER_FAIL = "LOGIN_MEMBER_FAIL";

export const registerMember = authData => {
    const {name,email, password,address,birthdate,entranceDate} = authData;
    
    return async dispatch => {
        //logic to make a post to create the member
        console.log('hry');
        const result = await fetch('http://192.168.1.38:3000/api/users/register', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password,
                address,
                birthdate,
                entranceDate
            })
        });
        console.log('ssss')
        const resultData = result.json();
        console.log(resultData);
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