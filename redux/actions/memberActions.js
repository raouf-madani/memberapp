export const SET_MEMBER_LIST= 'SET_MEMBER_LIST';

export const setMembers = () => {
   
    
    return async dispatch => {
        //logic to make a post to create the member
 
  

        const result = await fetch('http://192.168.1.38:3000/api/users/membersList');
   
  
        const resultData = await result.json();
    
        console.log(resultData);
        

        if(resultData){
            dispatch({
                type: SET_MEMBER_LIST,
                payload:resultData
            });
        }else{
           console.log('erooooor')
        }
         
    
        
       return resultData;
    };
};