import React, { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { isTablet } from "@/utils/deviceInfo";
import { Redirect } from "expo-router";
import { useScreenLock } from "@/hooks/useScreenLock";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import Drawer from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import CustomDrawer from "@/components/ui/CustomDrawer";
import { Colors } from "@/constants/Colors";



export default function AppLayout() {
  const checkIsTablet = isTablet();
 const [drawerType,setDrawerType]= useState<any>(null)
  

  const { authenticate } = useScreenLock();
  useEffect(() => {
    authenticate(); // authenticate user biometric if device supports
  }, []);

 

function AuthGuard({ children }: { children: any }) {
  const { loggedIn } = useAuthStore();
  if (!loggedIn) return <Redirect href={"/(auth)/login"} />;
  return <>{children}</>;
}

useEffect(()=>{
{checkIsTablet?setDrawerType('permanent'):setDrawerType('slide')}},[]) 

  return (
  <AuthGuard>
    <Drawer screenOptions={
      { drawerType:drawerType,
        overlayColor:'transparent',
        drawerActiveBackgroundColor:Colors.custom.blue,
        drawerActiveTintColor:Colors.custom.white,
        drawerLabelStyle:styles.drawerLabel,
        drawerStyle:styles.drawerStyle,
        drawerItemStyle:styles.drawerItem,
     }} drawerContent={(props)=><CustomDrawer{...props}/>}>
      <Drawer.Screen
        name="(tabs)"
        
        options={{
          drawerLabel:'Dashboard',
          headerShown:false,
          title: "Dashboard",
          drawerIcon: ({color}) => <FontAwesome size={20} name="dashboard" color={color}/>,
        }}
      />
    </Drawer>
  </AuthGuard>
  );
}
const styles = StyleSheet.create({
  drawerLabel:{
    fontFamily:'Roboto',
    fontSize:18,
    fontWeight:'semibold',
  },
  drawerStyle:{
    width:240,
    height:'100%'
  },
  drawerItem:{
    borderTopRightRadius:10,
    borderBottomLeftRadius:10
  }
})