import React,{useEffect,useState} from 'react';
import {StyleSheet, View, Text,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const Dashboard = props => {

    const [name, setName]=useState('');
    const [email, setEmail]= useState('');
    
    const loadMemberProfile = async ()=> {
     const token =await AsyncStorage.getItem('token');
     if(!token){
         props.navigation.navigate('Login');
     }
     console.log(token);

     const decodeToken = jwtDecode(token);
     setName(decodeToken.name);
     setEmail(decodeToken.email);
     console.log(decodeToken);
    };

    // logout the member and delete the token
   logout = props =>{
     AsyncStorage.removeItem('token').then(
        ()=>{
            props.navigation.replace('Login');
        }
     ).catch(err => console.log(err));
   };

    useEffect(()=>{
       loadMemberProfile();
    });

   return(
       <View style={styles.container}>
           <View><Text style={styles.text}>Hi {name?name:''} </Text></View>
           <View><Text style={styles.text}>Your email is {email?email:''} </Text></View>
             <View>
                 <Button
                 title="Logout"
                 onPress={
                     ()=>{
                         logout(props)
                     }
                 }
                 />
             </View>
       </View>
   )

};
Dashboard.navigationOptions= ()=>{
    return {
     
      headerLeft:()=>null,
    
    };
  }
const styles = StyleSheet.create({
 container:{
     flex:1,
     padding:40
 },
 text:{
     fontSize:16
 }
});

export default Dashboard;