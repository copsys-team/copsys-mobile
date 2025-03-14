import { Input } from "@rneui/themed"
import { StyleSheet,View,  TextInput } from "react-native"
export default function OtpBox({style,...props}){
    return(
        <View>
<TextInput {...props} 
keyboardType="numeric"
maxLength={1}
style={[styles.inputContainer,style]}

      />
      </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: 56,
        height: 56,
        borderWidth: 2,
        borderRadius: 12, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:20,
        fontSize:18
      },
})