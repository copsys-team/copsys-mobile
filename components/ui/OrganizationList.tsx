import { StyleSheet,Text, TouchableOpacity, View,Modal } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from "react";
import Animated from "react-native-reanimated";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import {BlurView} from 'expo-blur';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type measureProps=[number,number,number,number,number,number]


const organizations=[{name:'Amed Organization'},{name:'Justice Organization'},{name:'Goblex industries'}]
export default function OrganizationList(){
    const[pressed,setPressed]=useState(false)
    const buttonRef = useRef<any>(null)
    const[buttonPosition,setButtonPosition]=useState(0)
    const{setorganization,organization}=useAuthStore()
    return(
        <View>
            <TouchableOpacity ref={buttonRef} style={styles.button}
            
            onPress={()=>{
                buttonRef.current.measure((...args:measureProps)=>{
                    const [, , , height, , PageY] = args;
                  setButtonPosition(PageY + height-20)
                console.log(PageY,height)})
                  
            setPressed(!pressed)}}>
             <Text>{organization}</Text>
             <Animated.View style={{transform:[{rotate:pressed?'180deg':'0deg'}]}}>
             <AntDesign name="down" size={24} color="black" />
             </Animated.View>
           </TouchableOpacity>
            <Modal
            animationType='fade'
            visible={pressed}
            transparent={true} 
            onRequestClose={()=>setPressed(false)}
           style={{
            borderRadius:10,
            width:'100%',
            }}>
         <TouchableOpacity style={styles.modalOverlay} onPress={()=>setPressed(false)}>
             <BlurView experimentalBlurMethod='dimezisBlurView'
            intensity={0.9}
            tint='light'
             style={[styles.dropDownContainer,{top:buttonPosition,borderRadius:10,overflow:'hidden'}]}>
            <Animated.FlatList
           contentContainerStyle={styles.contentContainer}
           data={organizations}
           renderItem={({item})=>{
            return(
                
                    <TouchableOpacity style={styles.organizations} onPress={()=>{
                        setPressed(false)
                        setorganization(item.name)
                    }}><MaterialIcons name="verified-user" style={{paddingRight:10}} size={24} color="black" />
                        <Text style={{fontSize:18}}>{item.name}</Text>
                    </TouchableOpacity>
                
            )
           }}/>
           </BlurView>
        </TouchableOpacity>
           </Modal>
        
        </View>
    )
}
const styles=StyleSheet.create({
    button:{
        backgroundColor:'#02012B0D',
        borderWidth:2,
        borderRadius:6,
        borderColor:'#02012B8F',
        height:54,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    organizations:{
        borderRadius:10,
        padding:8,
        width:'100%',
        flexDirection:'row',
        flex:1
    },
    contentContainer:{
         gap:5},
    modalOverlay:{
         flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
    },
    dropDownContainer:{
        position: 'absolute',
        left: 20, 
        right: 20, 
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingVertical: 10,
        maxHeight:200
    }

})