import {View,Text,TextInput, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import GoBack from "@/components/common/GoBack"
import { router } from "expo-router"
import { useState } from "react"
import { Colors } from "@/constants/Colors"
import { CustomButton } from "@/components/common/CustomButton"

export default function ForgotScreen(){
    const[value,setValue]=useState('')
    return(<SafeAreaView style={{flex:1,padding:30,backgroundColor:Colors.light.background,alignItems:'center'}}>
<View > 
    <GoBack onPress={()=>router.back()}/>
     <Text style={{paddingVertical:20,fontSize:20,fontWeight:600}}>Forgot password</Text>
     <Text style={{fontWeight:600,
        fontSize:16,
        letterSpacing:-0.5,
        color:'#989898',
        lineHeight:20,
        paddingBottom:30}}>Please enter your email to reset the password</Text>
        <Text style={{fontWeight:600,
            color:'#2A2A2A',
            letterSpacing:-0.5,
            fontSize:16,
            lineHeight:20,
            paddingBottom:5
            }}>Your email</Text>
            <View style={{alignItems:'center'}}>
            <TextInput style={styles.input}
            placeholder="contact@copsys.com"
            placeholderTextColor={'black'}
            onChangeText={(text)=>{setValue(text)}}
            value={value}/> 
            </View>  
            <CustomButton
            title={'Reset Password'}
            color={Colors.custom.blue}
            buttonStyle={{borderRadius:17,height:56,width:314,marginTop:20}}/>
 </View>
 </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    input:{
        borderWidth:2,
        borderRadius:12,
        borderColor:'#E1E1E1',
        height:54,
        paddingHorizontal:10,
        width:314
    }
})