import React from 'react';
import {StyleSheet,  ScrollView} from 'react-native';
import MemberListCart from '../components/MemberListCart';
import {useSelector } from 'react-redux';

const MembersList = () => {
   
    const member= useSelector(state=>state.members.members);

    
   return(
       <ScrollView>
             {member.map(member=>(<MemberListCart
               name={member.name}
               email={member.email}
               address={member.address}
               birthdate={member.birthdate}
               entranceDate={member.entranceDate}
               />)
            )}
       
       </ScrollView>
   )

};

const styles = StyleSheet.create({
 
});

export default MembersList