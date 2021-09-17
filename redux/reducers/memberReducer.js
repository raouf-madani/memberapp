import {SET_MEMBER_LIST,UPDATE_MEMBER} from '../actions/memberActions';
import Member from '../../model/Member';



const initialState={
    members:[],
   
};

const memberReducer=(state=initialState,action)=>{
switch(action.type){
    
   case SET_MEMBER_LIST:
   return{
     ...state,
     members:action.payload
   };

   case UPDATE_MEMBER:
        
  
         
        const memberindex= state.members.findIndex(member => member._id === action.id);
        
        const updatedMemberData= new Member(

          action.memberData.name,
          action.memberData.email,
          action.memberData.address,
          action.memberData.birthdate,
          action.memberData.entranceDate
        );

        const updatedMembersData=[...state.members];
        updatedMembersData[memberindex]= updatedMemberData;
        return{
          ...state,
          members:updatedMembersData
        };

   default: 
        return state;
   

   }

}
export default memberReducer;