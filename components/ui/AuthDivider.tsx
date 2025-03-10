import { Colors } from "@/constants/Colors";
import { View,Text, StyleSheet } from "react-native";

export default function AuthDivider(){
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={styles.line}/>
            <Text style={styles.text}>Or Login With</Text>
            <View style={styles.line}/>
        </View>
    )
}
const styles = StyleSheet.create({
    line:{
        backgroundColor:Colors.ligtButtons.primary,
        height:1,
        width:104
    },
    text:{
        color:Colors.ligtButtons.primary,
        fontSize:12
    }
})