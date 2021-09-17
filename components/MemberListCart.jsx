import React,{useState} from 'react';
import { StyleSheet, Text, View,Dimensions,Platform, TouchableOpacity } from 'react-native';
import {useSelector } from 'react-redux';


//responsivity (Dimensions get method)
const height = Dimensions.get('window').height;
const screen = Dimensions.get('window');


const MemberListCart = props =>{
     

    return(
        <TouchableOpacity style={styles.serviceContainer}>
           <Text style={styles.registerButton}>
               {props.name} 
           </Text>
           <Text style={styles.registerButton}>
               {props.email} 
           </Text>
           <Text style={styles.registerButton}>
               {props.address} 
           </Text>
           <Text style={styles.registerButton}>
               {props.birthdate} 
           </Text>
           <Text style={styles.registerButton}>
               {props.entranceDate.slice(0, 25)} 
           </Text>        
       </TouchableOpacity>
     );    
};


const styles= StyleSheet.create({

  serviceContainer:{
    overflow:Platform.OS==='ios'?'visible':'hidden',
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:2},
    shadowRadius:2,
    shadowColor:"#000",
    borderRadius:screen.width/36,
    elevation:screen.width/72,
    alignSelf:'center',
    width:'90%',
    marginVertical:screen.width/36,
    height:height*0.25,
    backgroundColor:"#547",
     
    justifyContent:'center'
  },
  registerButton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf:'center',
    paddingVertical:5
  },
 
});

export default MemberListCart;