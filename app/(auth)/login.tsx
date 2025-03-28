import React, { useState } from "react";
import Oauth2 from "@/components/ui/Oauth2";
import { Text } from "@rneui/themed";
import {
  Alert,
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
import { Formik } from "formik";
import { useAuth } from "@/contexts/auth"

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const checkIsTablet = isTablet();
  const { logger } = useAuthStore();
  const { setCurrentTenantId } = useTenantStore();
  const {Login}=useAuth();
  
 

  return (
    <ScrollView style={{flex:1}}>
      <SafeAreaView style={[styles.container, { height: height }]}>
        <View style={[styles.content, checkIsTablet && { width: 500 }]}>

          <Text style={styles.title}>❤️ Welcome back! Please Login To Your Account</Text>
          <Text style={styles.label}>Organization</Text>
         <OrganizationList/>

        <Formik initialValues={{email:'',password:''}}
        validationSchema={LoginSchema}
        onSubmit={async(values)=>{
          logger(values.email,values.password)
          router.push('/(auth)/loginModal');
          }}>
          {({handleChange,handleSubmit,errors,setFieldTouched,touched})=>(
            <>
             <Text style={styles.label}>Email Address</Text>

<Input placeholder={'Enter your email'}
  changeText={handleChange("email")}
   focused={()=>setFieldTouched('email')}
   color={touched.email&&errors.email?'red':
    touched.email&&!errors.email?'green':'#02012B8F'}/>
  {touched.email&&errors.email&&<Text style={styles.error}>*{errors.email}</Text>}

<Text style={styles.label}>Password</Text>

<Input placeholder={'Enter your password'}
 changeText={handleChange("password")} 
 focused={()=>setFieldTouched('password')}
 color={touched.password&&errors.password?'red':
 touched.password&&!errors.password?'green':'#02012B8F'}/>
 {touched.password&&errors.password&&<Text style={styles.error}>*{errors.password}</Text>}
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
            onPress={()=>handleSubmit()}
          />
            </>
          )
}</Formik> 
         
          <AuthDivider/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>               
                      <Oauth2 location={'facebook'} onPress={()=>alert("feature still under development 😊 🛠️")}/>
                      <Oauth2 location={'google'} onPress={()=>alert("feature still under development 😊 🛠️")}/>
                      <Oauth2 location={'apple'} onPress={()=>alert("feature still under development 😊 🛠️")}/></View>
                      
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
    fontWeight:400,
    textAlign:'center'
  },
  error:{
    color:'red'
  }
});
