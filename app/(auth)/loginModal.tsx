import { CustomButton } from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import { useTenantStore } from "@/hooks/stores/useTenantStore";
import { BlurView } from "expo-blur";
import { Redirect, router } from "expo-router";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text,KeyboardAvoidingView, Pressable, TouchableOpacity, useWindowDimensions, View, StyleSheet, TextInput, Platform } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export default function LoginModal() {
  const [id,setId]=useState('')
  const { width, height } = useWindowDimensions();
 const {organization,login}=useAuthStore()
 const {setCurrentTenantId}=useTenantStore()
  return (<>
    <Stack.Screen name="loginModal" options={{presentation:'transparentModal',animation:'slide_from_bottom'}}/>
    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
      <Pressable  style={styles.modalOverlay} onPress={()=>router.back()}/>
        
         <View  style={{borderTopLeftRadius:50,borderTopRightRadius:50,height:height/2,marginTop:'auto',paddingTop:30,paddingHorizontal:20,backgroundColor:'white'}}>
         <TouchableOpacity onPress={()=>router.back()} >
          <Text style={{color:'royalblue',fontWeight:600,fontSize:16}}>Cancel</Text>
         </TouchableOpacity>
         <View style={{flex:1,alignItems:'center'}}>
          <Text style={{fontSize:50}}>🛡️</Text>
          <Text style={styles.title}>Selected Organization</Text>
          <Text style={styles.organization}>{organization}</Text>
          <Text style={styles.title}>Enter a valid organizational Id</Text>
          <KeyboardAvoidingView  behavior={Platform.OS==='ios'?'padding':'height'}>
            <TextInput placeholder='Enter Id'
            onChangeText={(Text)=>setId(Text)}
             style={{backgroundColor:'lightgray',
             paddingHorizontal:10,
             borderWidth:2,
             width:200,
             borderColor:Colors.custom.blue,
             borderRadius:25,
             marginVertical:10}}/>
          </KeyboardAvoidingView>
         <CustomButton 
         buttonStyle={styles.button} 
         title='Move to Dashboard'
          color={Colors.custom.blue}
          onPress={()=>router.push('/(main)/(tabs)')}/>
         </View>
       </View>
      </View>
    
  
       </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    opacity:0,
  backgroundColor:'rgba(0,0,0,0.5)'},
  title:{
    color:'gray',
    fontWeight:700,
    fontSize:18,
    paddingVertical:10
  },
  organization:{
    fontWeight:500,
    fontSize:16,
    paddingVertical:10,
    color:Colors.custom.brown,
    
  },
  button:{
    width:300,
    marginTop:30
  }


});
