import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {Text,View,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
export default function RememberMe(){
const [check,setCheck]=useState(false)
    return(
        
        <TouchableOpacity onPress={()=>setCheck(check?false:true)} >
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <FontAwesome5 name={check?"check-square":"square"} 
                   size={24} 
                   color={check?'black':'grey'} />
        
       <Text style={{color:Colors.custom.blue,paddingLeft:10}}>Remember me</Text>
       </View>         
        </TouchableOpacity>           
    )
}