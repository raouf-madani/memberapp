import React,{useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = props => {
    
    const loadMemberProfile = async ()=> {
     const token =await AsyncStorage.getItem('token');
     if(!token){
         props.navigation.navigate('Login');
     }
     console.log(token);
    };

    useEffect(()=>{
       loadMemberProfile();
    });

   return(
       <View>
             <Text>Dashboard</Text>
       </View>
   )

};
Dashboard.navigationOptions= ()=>{
    return {
     
      headerLeft:()=>null,
    
    };
  }
const styles = StyleSheet.create({
 
});

export default Dashboard;