export const SET_MEMBER_LIST= 'SET_MEMBER_LIST';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';

export const setMembers = () => {
   
    
    return async dispatch => {

        //logic to make a post to create the member
        const result = await fetch('http://192.168.1.38:3000/api/users/membersList');

        const resultData = await result.json();
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

export const updateMember = (id,name,email,address,birthdate,entranceDate) => {


    return async dispatch => {
      
        try{
             
       
            const response = await fetch(`http://192.168.1.38:3000/api/users/updateMember/${id}`,{
 
               method:'PATCH',
               headers: {
                 'Content-Type': 'application/json'
             },
             body : JSON.stringify({name,email,address,birthdate,entranceDate})
            });
            console.log('response');
            if(!response.ok){
                console.log('response isnt okkkkk');
                throw new Error('Oups! Une erreur est survenue in ur fetch.');
            }
   
           
            dispatch({type:UPDATE_MEMBER,id,memberData:{name,email,address,birthdate,entranceDate}});
            
          }catch(err){
              console.log(err);
              throw err;
          }

    };
};