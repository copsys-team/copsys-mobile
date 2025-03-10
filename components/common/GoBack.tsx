import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function GoBack({onPress}:any){
    return(
        <View style={{backgroundColor:'#ECECEC',borderRadius:25,alignItems:'center',height:40,width:40,justifyContent:'space-around'}}>
        <Ionicons name="chevron-back" size={25} color="black" onPress={onPress} />
        </View>
    )
}