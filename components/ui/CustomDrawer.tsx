import { View,Text,Image, TouchableNativeFeedback, StyleSheet, TouchableOpacity,LayoutAnimation, Platform, UIManager } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { DrawerMenu } from "@/constants/Screens";
import {useState} from "react"
import { Redirect, router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

if(Platform.OS==='android'){
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
export default function CustomDrawer(props:any){
    const [menuIndex,setMenuIndex]=useState(-1)
   
    return(
        <View style={styles.container}>
         <TouchableNativeFeedback style={styles.gradient}>
            <View style={styles.gradient}>
            <Image source={require('@/assets/images/Welcome.png')} style={styles.gradient}/>
            </View>
         </TouchableNativeFeedback>
         <DrawerItemList{...props} />
         <View style={{borderBottomWidth:2,borderBottomColor:'lightgray'}}/>
         {/*menu*/}
         {DrawerMenu.map((item,index)=>{return(
    <TouchableOpacity activeOpacity={0.8} onPress={()=>{LayoutAnimation.configureNext(LayoutAnimation.create(200,'easeInEaseOut','opacity'))
    setMenuIndex(menuIndex===index?-1:index)}}>
        <View style={styles.menuStyle}>
         <Text>{item.title}</Text> 
        {menuIndex===index?<Feather name="chevrons-up" size={24} color="black" />:<Feather name="chevrons-down" size={24} color="black" />}
        </View>
        {(menuIndex === index)&&<View>
            {item.MenuLists.map((submenu,index)=>{
                return(<TouchableOpacity style={styles.subMenuStyle} onPress={()=>router.push(`/drawerScreens/${submenu.route}`)}>
                   <Text>{submenu.title}</Text> 
                </TouchableOpacity>)
            })}</View>}
    </TouchableOpacity>
         )})}
        </View>
        
    )
}
const styles = StyleSheet.create({
    gradient:{
        width:'100%',
        height:120,
        paddingTop:20
    },
    container:{
        padding:10,
        gap:5,
        flex:1
    },
    menuStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#A5D6A7',
        height:40,
        width:'100%',
        borderRadius:10
    },
    subMenuStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#8D6E63',
        height:38,
        width:'auto',
        borderRadius:10,
        marginVertical:5,
        marginHorizontal:5
    }
})