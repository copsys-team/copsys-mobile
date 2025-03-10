import React, { useState } from "react";
import { Text } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "@/components/common/CustomButton";
import { Link, router } from "expo-router";
import { isTablet } from "@/utils/deviceInfo";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useTenantStore } from "@/hooks/stores/useTenantStore";
import Input from "@/components/ui/input";
import RememberMe from "@/components/ui/rememberMe"
import { Colors } from "@/constants/Colors";
import OrganizationList from "@/components/ui/OrganizationList";
import AuthDivider from "@/components/ui/AuthDivider";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  auth_field: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email address")
    .when("auth_field", {
      is: "email",
      then: (schema: any) => schema.required("Email is required"),
      otherwise: (schema: any) => schema.notRequired(),
    }),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .when("auth_field", {
      is: "phone",
      then: (schema: any) => schema.required("Phone number is required"),
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const { height } = useWindowDimensions();
  const checkIsTablet = isTablet();
  const { login } = useAuthStore();
  const { setCurrentTenantId } = useTenantStore();
 

  return (
    <ScrollView style={{flex:1}}>
      <SafeAreaView style={[styles.container, { height: height }]}>
        <View style={[styles.content, checkIsTablet && { width: 500 }]}>

          <Text style={styles.title}>Welcome back! Please Login To Your Account</Text>
          <Text style={styles.label}>Organization</Text>
         <OrganizationList/>
          <Text style={styles.label}>Email Address</Text>

          <Input placeholder={'Enter your email'}
           value={email} changeText={(text:string)=>setEmail(text)} />

          <Text style={styles.label}>Password</Text>

          <Input placeholder={'Enter your password'}
           value={password} changeText={(text:string)=>setPassword(text)}/>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:20}}>
           <RememberMe/>
           <Link href={'/(auth)/forgot'}>
           <Text style={{color:Colors.custom.brown}}>Forgot Password?</Text>
           </Link>
           </View>
          <CustomButton
          buttonStyle={{height:42,marginVertical:20}}
          color={Colors.custom.blue}
            title={"Continue Now"}
            onPress={() => {
              setCurrentTenantId("abc123");
              login(
                {
                  id: 1,
                  name: "Eric Mensah",
                  phone: "",
                  sex: "female",
                },
                { refreshToken: "123", accessToken: "122" }
              );

              router.replace('/(main)/(tabs)');
            }}
          />
          <AuthDivider/>
        </View>
      </SafeAreaView>
      </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:20,
    backgroundColor:Colors.light.background
  },
  header: {
    alignItems: "center",
  },
  content:{
    padding:20,
  },
  forgotText: {
    textAlign: "center",
  },
  forgotContent: {
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label:{
    marginTop:10,
    marginBottom:5,
    fontSize:16,
    fontWeight:600
  },
  title:{
    fontSize:13,
    alignSelf:'center',
    marginBottom:10,
    fontWeight:400
  }
});
