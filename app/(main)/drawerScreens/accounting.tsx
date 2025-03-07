import { View, Text,Button } from 'react-native'
import React from 'react'
import { OpenDrawer } from '../_layout'
import { DrawerActions } from '@react-navigation/native'
const accounting = () => {
  return (
    <View>
      <Button title='click' onPress={()=>OpenDrawer()}/>
    </View>
  )
}

export default accounting