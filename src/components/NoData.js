import { View, Text } from 'react-native'
import React from 'react'

const NoData = (props) => {
  return (
    <View style={{justifyContent:'flex-start',alignItems : 'center', borderColor:"black",borderWidth:0,flex:1, marginTop:30}}>
        <Text style={{color:'black',fontSize:17}}>{props.message ? props.message : "No file uploaded yet" }</Text>
    </View>
  )
}

export default NoData;