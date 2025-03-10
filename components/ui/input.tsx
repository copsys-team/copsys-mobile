import { StyleSheet,View, TextInput,useWindowDimensions } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
export default function Input ({value,placeholder,changeText}:any){
    const {width} = useWindowDimensions()
    const [notsecured,setNotSecured] = useState(false)
    return <View style={[styles.input,{width:width*0.85}]}>
           <TextInput
           secureTextEntry={placeholder==='Enter your password'&&!notsecured}
            value={value}
            onChangeText={changeText}
            placeholder={placeholder}
            cursorColor={'black'}
            style={{marginRight:'auto',fontSize:16,fontWeight:600,flex:1}}
            />
            {placeholder==='Enter your password'&&
            <Entypo 
            name={notsecured?'eye':'eye-with-line'} 
            size={24}
             color={notsecured?'black':'gray'}
             onPress={()=>setNotSecured(!notsecured)} />}
            </View>
}
const styles=StyleSheet.create({
    input:{
        backgroundColor:'#02012B0D',
        borderWidth:2,
        borderRadius:6,
        borderColor:'#02012B8F',
        height:54,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
      }
})