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

//define validation schema
const formSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

const MemberRegisterScreen = navData => {


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
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log(values);
          navData.navigation.navigate("Dashboard");
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.image}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
              <Text style={styles.error}>
                {props.touched.name && props.errors.name}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      },
      logo: {
        alignItems: "center",
        marginBottom: 40,
      },
      image: {
        width: 100,
        height: 100,
      },
      input: {
        width: 300,
        backgroundColor: "#B6BFC4",
        borderRadius: 25,
        padding: 16,
        fontSize: 16,
        marginVertical: 10,
      },
      button: {
        width: 300,
        backgroundColor: "#738289",
        borderRadius: 25,
        marginVertical: 10,
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