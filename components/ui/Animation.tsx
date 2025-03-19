import { Modal,View } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";

const Animation=({loading,success,onAnimationFinish}:any)=>{
    const loadingSource = require('@/assets/animations/loading.json')
    const successSource = require('@/assets/animations/success.json')
    const HandleAnimationFinish=()=>{onAnimationFinish(true)}
    
    return(<>
        <Modal
        transparent={true}
        visible={(loading===true||success===true)?true:false}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',alignItems:'center',justifyContent:'center'}}>
           <LottieView
           autoPlay
           loop={loading===true?true:false}
           style={{
            width:200,
            height:200
           }}
           source={loading?loadingSource:successSource}
    onAnimationFinish={HandleAnimationFinish}
           />

            </View>

        </Modal>
        </>
    )
}
export default Animation