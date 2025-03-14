import GoBack from '@/components/common/GoBack'
import { router } from 'expo-router'
import {View,Text, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import OtpBox from '@/components/ui/OtpBox'
import { useState,useEffect } from 'react'
import { CustomButton } from '@/components/common/CustomButton'
import { color } from '@rneui/base'
import { Colors } from '@/constants/Colors'
export default function VerifyOtp (){
    const [fdigit,setFdigit]=useState<string | null>(null)
    const [sdigit,setSdigit]=useState<string | null>(null)
    const [tdigit,setTdigit]=useState<string | null>(null)
    const [fodigit,setFodigit]=useState<string | null>(null)
    const [otpCode,setOtpCode]=useState<string | null>(null)
    const[done,setDone]=useState(false)
    useEffect(()=>{
    if(tdigit&&fodigit&&fdigit&&sdigit){
        setDone(true)
        setOtpCode(fdigit+sdigit+tdigit+fodigit)
    }
else{
    setDone(false)
}},[tdigit,fodigit,fdigit,sdigit])
    useEffect(() => {
        if (otpCode) {
          console.log(otpCode);
        }
      }, [otpCode]);
      
    return(
        <SafeAreaView style={{flex:1,padding:30,backgroundColor:Colors.light.background,alignItems:'center'}}>
        <View>
            <GoBack onPress={()=>router.back()}/>
                <Text style={styles.title}>Check your email</Text>
               <Text style={styles.information}>We sent a reset link to contact@copsys.com 
                enter 5 digit code mentioned in the email
               </Text>
               <View style={{marginVertical:20,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                 <OtpBox onChangeText={(text:any)=>setFdigit(text)} value={fdigit} style={{ borderColor: done ? 'royalblue' : 'gray' }}/>
                 <OtpBox onChangeText={(text:any)=>setSdigit(text)} value={sdigit} style={{ borderColor: done ? 'royalblue' : 'gray' }}/>
                 <OtpBox onChangeText={(text:any)=>setTdigit(text)} value={tdigit} style={{ borderColor: done ? 'royalblue' : 'gray' }}/>
                 <OtpBox onChangeText={(text:any)=>setFodigit(text)} value={fodigit} style={{ borderColor: done ? 'royalblue' : 'gray' }}/>
               </View>
               <CustomButton
                title='Verify'
                 color={Colors.custom.blue}
                 onPress={()=>router.push('/(auth)/setPassword')} 
                 disabled={done===false}
                  disabledStyle={styles.disabled}
                  buttonStyle={{borderRadius:17,height:56,width:314,marginTop:20}}/>          
              </View>
              
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    title:{paddingVertical:20,
        fontSize:20,
        lineHeight:20,
        fontWeight:600
    },
    information:{
        fontWeight:600,
        fontSize:16,
        lineHeight:20,
        letterSpacing:-0.5,
        color:'#989898',
    },
    disabled:{
        backgroundColor:'lightblue'
    },
    button:{
        backgroundColor:Colors.custom.blue
    }
})