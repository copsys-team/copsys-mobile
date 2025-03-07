import { View,Text,Image, TouchableNativeFeedback, StyleSheet, TouchableOpacity,LayoutAnimation, Platform, UIManager, ScrollView } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { DrawerMenu } from "@/constants/Screens";
import {useState} from "react"
import {router} from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Animated, { FlipInXUp} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Icon } from "@rneui/themed";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function CustomDrawer(props:any){
    const [menuIndex,setMenuIndex]=useState(-1)
    const [submenuIndex,setSubmenuIndex]=useState(-1)
    const [color,setColor]=useState(Colors.ligtButtons.secondary)
    const [pressedSubmenu,setPressedSubmenu]=useState<any>(null)
   
    return(
       <DrawerContentScrollView showsVerticalScrollIndicator={false} style={{height:'100%',flex:1}}>
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
    <TouchableOpacity activeOpacity={0.8} onPress={()=>{
        setMenuIndex(menuIndex===index?-1:index)
        }}>
        <View style={styles.menuStyle}>
        <View style={{flexDirection:'row'}}>
        <Icon name={item.icon} size={20} type={item.iconType} color={Colors.ligtButtons.primary} style={{paddingRight:10,paddingLeft:5}}/>
         <Text style={{color:Colors.ligtButtons.primary,fontFamily:'roboto'}}>{item.title}</Text>
         </View>


         <Animated.View style={{ transform:[
                {
                    rotate:(menuIndex===index) ?'90deg':'0deg'
                }
            ],paddingLeft:'auto'}}>
            
        <Feather name="chevron-right" size={24} color={Colors.ligtButtons.primary} style={{textAlign:'right'}}/>
 
        </Animated.View>


        </View>
        {(menuIndex === index)&&<View>
            {item.MenuLists.map((submenu,index)=>{
                return(
                <Animated.View entering={FlipInXUp} >
                    <TouchableOpacity 
                    style={[styles.subMenuStyle,{backgroundColor:pressedSubmenu===submenu.route?Colors.ligtButtons.primary:Colors.custom.white,flexDirection:'row'}]} 
                    onPress={()=>{
                       setSubmenuIndex(submenuIndex===index?-1:index)
                        setPressedSubmenu(submenu.route)
                       
                        router.push(`/drawerScreens/${submenu.route}`)}}>
                     <Ionicons name="send-sharp" size={18} color={pressedSubmenu===submenu.route?
                        Colors.custom.white:Colors.ligtButtons.primary} />     
                     <Text style={{color:pressedSubmenu===submenu.route?
                        Colors.custom.white:Colors.ligtButtons.primary,
                        paddingLeft:10,fontFamily:'roboto'}}>{submenu.title}</Text>           
                </TouchableOpacity>
                </Animated.View>)
            })}</View>}
    </TouchableOpacity>

         )})}
         </View>
        
        
         {/*logout button*/}
         <TouchableOpacity style={styles.logout} onPress={()=>router.push('/(auth)/login')}>
         <Feather name="log-out" size={24} color={Colors.custom.white} />
         <Text style={{fontWeight:'semibold',fontSize:18,paddingLeft:10,color:Colors.ligtButtons.accentText}}>Logout</Text>
         </TouchableOpacity>
        </View>
    </DrawerContentScrollView>
       
        
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
        backgroundColor:Colors.light.background
    },
    menuStyle:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.light.background,
        height:40,
        width:'100%',
        borderRadius:10,
        shadowRadius:25,
        shadowColor:'lightgray',
        justifyContent:'space-between'
    },
    subMenuStyle:{
        flexDirection:'row',
        paddingLeft:10,
        alignItems:'center',
        height:38,
        borderRadius:25,
        marginVertical:5,
    },
    logout:{
        height:40,
        width:'100%',
        backgroundColor:Colors.ligtButtons.accent,
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,
        marginBottom: 10      
        
    }
})