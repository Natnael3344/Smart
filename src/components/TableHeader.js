import { View, Text } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/GlobalConstants'

const TableHeader = ({title,title1}) => {
  return (
    <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLOR.BACKGROUND_COLOR,
          justifyContent:'space-evenly',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          marginBottom:10
        }}>
        <Text style={{ fontWeight: 'bold', color: 'white', flex: 0.1}}>No.</Text>
        <Text style={{ fontWeight: 'bold', color: 'white',textAlign:'center', flex: 0.4}}>{title}</Text>
        <Text style={{ fontWeight: 'bold', color: 'white',textAlign:'center', flex: 0.4}}>{title1}</Text>
        <Text style={{ fontWeight: 'bold', color: 'white', flex: 0.15}}>Action</Text>
      </View>
  )
}

export default TableHeader