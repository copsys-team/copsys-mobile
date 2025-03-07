import { View,Text,Image, TouchableNativeFeedback, StyleSheet, TouchableOpacity,LayoutAnimation, Platform, UIManager } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { DrawerMenu } from "@/constants/Screens";
import {useState} from "react"
import {router} from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Animated, { FlipInXUp} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Icon } from "@rneui/themed";



export default function CustomDrawer(props:any){
    const [menuIndex,setMenuIndex]=useState(-1)
    
   
    return(
        <View style={styles.container}>
            <View style={{padding:10,gap:5}}>

         <TouchableNativeFeedback style={styles.gradient}>
            <View style={styles.gradient}>
                <Text style={{fontSize:30,fontWeight:700}}>👋 Welcome</Text>
            </View>
         </TouchableNativeFeedback>

         <DrawerItemList{...props} />
         {/*grayspacing*/}

         <View style={{borderBottomWidth:2,borderBottomColor:'lightgray',marginVertical: 10}}/>
         {/*menu*/}
         {DrawerMenu.map((item,index)=>{return(
    <TouchableOpacity activeOpacity={0.8} onPress={()=>{setMenuIndex(menuIndex===index?-1:index)}}>
        <View style={styles.menuStyle}>
        <Icon name={item.icon} size={20} type={item.iconType} color={Colors.custom.blue}/>
         <Text style={{paddingLeft:10,color:Colors.custom.black}}>{item.title}</Text>


         <Animated.View style={{ transform:[
                {
                    rotate:(menuIndex===index) ?'90deg':'0deg'
                }
            ]}}> 
        <Feather name="chevron-right" size={24} color={Colors.custom.black} />
        </Animated.View>


        </View>
        {(menuIndex === index)&&<View>
            {item.MenuLists.map((submenu,index)=>{
                return(
                <Animated.View entering={FlipInXUp}>
                    <TouchableOpacity style={styles.subMenuStyle} onPress={()=>router.push(`/drawerScreens/${submenu.route}`)}>
                     <Text style={{color:Colors.custom.white}}>{submenu.title}</Text>           
                </TouchableOpacity>
                </Animated.View>)
            })}</View>}
    </TouchableOpacity>

         )})}
         </View>
         {/*logout button*/}
         <TouchableOpacity style={styles.logout} onPress={()=>router.push('/(auth)/login')}>
         <Feather name="log-out" size={24} color={Colors.custom.white} />
         <Text style={{fontWeight:'semibold',fontSize:18,paddingLeft:10,color:Colors.custom.white}}>Logout</Text>
         </TouchableOpacity>
        </View>
        
    )
}


const styles = StyleSheet.create({
    gradient:{
        width:'100%',
        height:100,
        padding:10,
        paddingTop:20,
        flexDirection:'row'
    },
    container:{
        flex:1,
        backgroundColor:Colors.custom.white
    },
    menuStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:Colors.custom.white,
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
        backgroundColor:Colors.custom.blue,
        height:38,
        width:'auto',
        borderRadius:10,
        marginVertical:5,
        marginHorizontal:5
    },
    logout:{
        height:40,
        width:'100%',
        backgroundColor:Colors.custom.black,
        marginTop:'auto',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,
        marginBottom: 10      
        
    }
})