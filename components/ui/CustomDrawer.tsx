import { View,Text,Image, TouchableNativeFeedback, StyleSheet, TouchableOpacity,LayoutAnimation, Platform, UIManager } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { DrawerMenu } from "@/constants/Screens";
import {useState} from "react"
import { Redirect, router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Animated, { BounceInRight, BounceOutRight, LightSpeedInLeft, LightSpeedOutLeft, useAnimatedStyle, withTiming } from "react-native-reanimated";



export default function CustomDrawer(props:any){
    const [menuIndex,setMenuIndex]=useState(-1)
    
   
    return(
        <View style={styles.container}>
            <View style={{padding:10,gap:5}}>
         <TouchableNativeFeedback style={styles.gradient}>
            <View style={styles.gradient}>
            <Image source={require('@/assets/images/Welcome.png')} style={styles.gradient}/>
            </View>
         </TouchableNativeFeedback>
         <DrawerItemList{...props} />
         <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',marginVertical: 10}}/>
         {/*menu*/}
         {DrawerMenu.map((item,index)=>{return(
    <TouchableOpacity activeOpacity={0.8} onPress={()=>{setMenuIndex(menuIndex===index?-1:index)}}>
        <View style={styles.menuStyle}>
         <Text>{item.title}</Text>
         <Animated.View style={{ transform:[
                {
                    rotate:(menuIndex===index) ?'90deg':'0deg'
                }
            ]}}> 
        <Feather name="chevron-right" size={24} color="black" />
        </Animated.View> 
        </View>
        {(menuIndex === index)&&<View>
            {item.MenuLists.map((submenu,index)=>{
                return(<Animated.View entering={BounceInRight} exiting={BounceOutRight}>
                    <TouchableOpacity style={styles.subMenuStyle} onPress={()=>router.push(`/drawerScreens/${submenu.route}`)}>
                     <Text>{submenu.title}</Text>           
                </TouchableOpacity>
                </Animated.View>)
            })}</View>}
    </TouchableOpacity>
         )})}
         </View>
         <TouchableOpacity style={styles.logout} onPress={()=>router.push('/(auth)/login')}>
         <Feather name="log-out" size={24} color="black" />
         <Text style={{fontWeight:'semibold',fontSize:18,paddingLeft:10}}>Logout</Text>
         </TouchableOpacity>
        </View>
        
    )
}


const styles = StyleSheet.create({
    gradient:{
        width:'100%',
        height:100,
        padding:10,
        paddingTop:20
    },
    container:{
        flex:1,
    },
    menuStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#A5D6A7',
        height:40,
        width:'100%',
        borderRadius:10,
        shadowRadius:25,
        shadowColor:'lightgray'
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
    },
    logout:{
        height:40,
        width:'100%',
        backgroundColor:'rgb(243, 96, 94)',
        marginTop:'auto',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,      
        
    }
})