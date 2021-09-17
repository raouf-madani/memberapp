import {SET_MEMBER_LIST} from '../actions/memberActions';
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


   default: 
        return state;
   

   }



}
export default memberReducer;