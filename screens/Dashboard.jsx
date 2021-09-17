import React,{useEffect,useState,useCallback} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Cart from '../components/cart';
import * as memberActions from '../redux/actions/memberActions';
import { useDispatch,useSelector } from 'react-redux';

const Dashboard = props => {
    const [error, setError] = useState();
    const [isLoading,setIsLoading]= useState(false);//ActivityIndicator handling
    const dispatch= useDispatch();

    const getMembers=useCallback(async()=>{
  
  

        try{
          setError(false);
          setIsLoading(true);
      
          await dispatch(memberActions.setMembers());
        
          setIsLoading(false);
    
          }catch(err){
            console.log('error fatal')
            setError(true);
            throw err; 
          }
      },[dispatch,setError]);

      useEffect(()=>{
       
        getMembers();
 
        },[dispatch,getMembers,setError]);
   
    const [email, setEmail]= useState('');
    
    const loadMemberProfile = async ()=> {
     const token =await AsyncStorage.getItem('token');
     if(!token){
         props.navigation.navigate('Login');
     }
     console.log(token);

     const decodeToken = jwtDecode(token);
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

           <View style={styles.textCont}><Text style={styles.text}>Hi {email?email:''} </Text></View>
            
                 <TouchableOpacity
                  style={styles.button}
                   onPress={
                    ()=>{
                        logout(props)
                    }
                }
                >
                  <Text style={styles.registerButton}>Logout</Text>
                </TouchableOpacity>
                <View><Text style={styles.text2}>Menu : </Text></View>
                <Cart
                  title="Members List"
                  onPress={()=>props.navigation.navigate("MembersList")}
                  />
                   <Cart
                  title="Update your information"
                  onPress={()=>props.navigation.navigate("UpdateMember")}
                  />
             
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
 textCont:{
   alignItems:'center',
   paddingBottom:10
 },
 text:{
     fontSize:16
 },
 text:{
    fontSize:16,
    color:'#0066ff'
},
 button: {
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 13,
  },
  registerButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf:'center'
  },
});

export default Dashboard;