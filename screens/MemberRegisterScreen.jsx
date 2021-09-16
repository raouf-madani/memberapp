import React from 'react';
import { StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,} from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import * as authAction from '../redux/actions/authActions';
import {useDispatch} from 'react-redux';

//define validation schema
const formSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    address:yup.string(),
    birthdate:yup.string(),
    entranceDate:yup.string()
  });

const MemberRegisterScreen = navData => {

   const dispatch = useDispatch();

   return(
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          address:"",
          birthdate:"",
          entranceDate:""
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(authAction.registerMember(values))
          .then(()=>{
            navData.navigation.navigate("Dashboard");
          })
          .catch(err => console.log(err));
         
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
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
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
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Have an account?</Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate("Login")}
                >
                  <Text style={styles.registerButton}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
   )

};

MemberRegisterScreen.navigationOptions= ()=>{
    return {
      headerTransparent : true ,
      headerStyle:{
          backgroundColor: 'white'
      },
      headerBackTitle : " ",
      headerTitle: () => (
        <Image 
        style={{
          resizeMode:'contain',
          alignSelf: 'center'}}
        
        />
      ),
      headerLeft:()=>null,
    
    };
  }

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

export default MemberRegisterScreen;