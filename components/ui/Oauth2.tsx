import { StyleSheet } from "react-native";
import { TouchableOpacity,Image } from "react-native";
const imageSources = {
    apple: require('../../assets/images/apple.png'),
    facebook: require('../../assets/images/facebook.png'),
    google: require('../../assets/images/google.png'),

  };
export default function Oauth2({location,onPress}:any){
   const imageSource=imageSources[location]
    return(
        <TouchableOpacity onPress={onPress} style={styles.view}>
            <Image source={imageSource} style={styles.image}/>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    image:{
        height:32,
        width:32
    },
    view:{
        width:93,
        height:55,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#0000004F',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'space-around'
    }
})