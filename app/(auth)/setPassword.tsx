import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text } from "react-native";
import Input from "@/components/ui/input";
import { Colors } from "@/constants/Colors";
import {CustomButton} from "@/components/common/CustomButton";
import GoBack from "@/components/common/GoBack";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8,"Password must be at least 8 characters")
    .required("Password is required"),
  retypePassword: Yup.string()
    .required("Confirm new password"),
});
export default function SetPassword(){
    return(
     <SafeAreaView style={{flex:1,padding:30,backgroundColor:Colors.light.background,alignItems:'center'}}>
        <View>
      <GoBack onPress={()=>router.push('/(auth)/forgot')}/>
      <Text style={styles.title}>Set a new password</Text>
      <Text style={styles.information}>Create a new password.Ensure it differs from previous ones for security</Text>
      <Formik initialValues={{newPassword:'',retypePassword:''}}
      validationSchema={LoginSchema} 
      onSubmit={(values)=>{console.log(values)
        router.push('/(auth)/login')
      }}>
        {({handleChange,values,handleSubmit,errors,setFieldTouched,touched,setErrors})=>(
          <>
     <Text style={styles.headers}>Password</Text>
      <Input placeholder={'Enter new password'} 
      color={touched.newPassword&&errors.newPassword?'red':
        touched.newPassword&&!errors.newPassword?'green':'#02012B8F'}
      focused={()=>setFieldTouched('newPassword')}
      changeText={handleChange('newPassword')}/>
      {touched.newPassword&&errors.newPassword&&<Text style={styles.errors}>*{errors.newPassword}</Text>}
      <Text style={styles.headers}>Confirm Password</Text>
      <Input placeholder={'Re-type new password'}
      color={touched.retypePassword&&errors.retypePassword?'red':
        touched.retypePassword&&!errors.retypePassword?'green':'#02012B8F'}
      focused={()=>{setFieldTouched('retypePassword')}} 
      changeText={handleChange('retypePassword')
      }/>
      {touched.retypePassword&&errors.retypePassword&&<Text style={styles.errors}>*{errors.retypePassword}</Text>}
      <CustomButton title={'Update password'}
       color={Colors.custom.blue}
        buttonStyle={{marginVertical:20}}
        onPress={()=>{
          values.newPassword!==values.retypePassword?
          setErrors({retypePassword:'Passwords do not match'}):handleSubmit()}}/>
      
          </>
        )}
      </Formik>
        </View>
     </SafeAreaView>
    )
}
const styles=StyleSheet.create({
title:{fontSize:20,
fontWeight:600,
lineHeight:20,
paddingVertical:20
},
errors:{
color:'red'
},
information:{fontWeight:500,
  fontSize:16,
  lineHeight:25,
  color:'#989898'},
headers:{fontSize:16,
  fontWeight:600,
  paddingVertical:10},
button:{},
textBox:{}})