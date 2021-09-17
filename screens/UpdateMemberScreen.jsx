import React, { useCallback } from 'react';
import { StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    Alert,} from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import * as memberActions from '../redux/actions/memberActions';
import {useDispatch,useSelector} from 'react-redux';


//define validation schema
const formSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    address:yup.string(),
    birthdate:yup.string(),
    entranceDate:yup.string()
  });

const UpdateMemberScreen = navData => {

   //initialize our dispatch function
   const dispatch = useDispatch();
   //retrieve the member ID from dashboard screen
   const memberID= navData.navigation.getParam('memberID'); 
   
   //bring our connected member object using find method
   const members= useSelector(state=>state.members.members);
   const member = members.find(object=>object._id === memberID);

   const updateHandler = async ()=>{
      try{
        await dispatch(memberActions.updateMember(member._id,member.name,member.address,member.email,member.birthdate,member.entraceDate))
      }catch(err){
         console.log(err);
      }
   };
 

   return(
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          name: member?member.name:"",
          email: member?member.email:"",
          address:member?member.address:"",
          birthdate:member?member.birthdate:"",
          entranceDate:member?member.entranceDate:""
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          /*  console.log(values);
         console.log('iM UPDATING DUDE');
          dispatch(memberActions.updateMember(member._id,member.name))
          .then(async result=>{
              if(result.success){
                try{
                    console.log('sucesssssss update');
                  }catch(err){
                    console.log('errrrrooooor update');
                      console.log(err);
                  }
              }else{
                  Alert.alert(`Sorry`,'Try again');
              }
         
          })
          .catch(err => console.log(err));*/
         
        }}
      >
        {(props) => (
          <View style={styles.container}>
            
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
           
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
            
            
           
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("address")}
                value={props.values.address}
                onBlur={props.handleBlur("address")}
              />
            
              <TextInput
                style={styles.input}
                placeholder="Birthdate"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("birthdate")}
                value={props.values.birthdate}
                onBlur={props.handleBlur("birthdate")}
              />
         
              <TextInput
                style={styles.input}
                placeholder="Entrance Date"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("entranceDate")}
                value={props.values.entranceDate}
                onBlur={props.handleBlur("entranceDate")}
              />
           
              <TouchableOpacity
                style={styles.button}
                onPress={updateHandler}
              >
                <Text style={styles.buttonText}>Update Now</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
   )

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      },
      image: {
        width: 100,
        height: 100,
      },
      input: {
        width: 300,
        backgroundColor: "#B6BFC4",
        borderRadius: 25,
        padding: 12,
        fontSize: 14,
        marginVertical: 10,
      },
      button: {
        width: 300,
        backgroundColor: "#738289",
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 13,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
        textAlign: "center",
      },
      registerContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
        paddingVertical: 16,
        flexDirection: "row",
      },
      registerText: {
        color: "#738289",
        fontSize: 16,
      },
      registerButton: {
        color: "#738289",
        fontSize: 16,
        fontWeight: "bold",
      },
      error: {
        color: "red",
      },
});

export default UpdateMemberScreen;