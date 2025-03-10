import {View,Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import GoBack from "@/components/common/GoBack"
import { router } from "expo-router"
import Input from "@/components/ui/input"
import { Colors } from "@/constants/Colors"
import { CustomButton } from "@/components/common/CustomButton"
export default function ForgotScreen(){
    return(<SafeAreaView style={{flex:1,padding:30,backgroundColor:Colors.light.background}}>
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
            <Input/>   
            <CustomButton
            title={'Reset Password'}
            color={Colors.ligtButtons.primary}
            buttonStyle={{borderRadius:17,height:56,width:314,marginTop:20}}/>
 </View>
 </SafeAreaView>
    )
}