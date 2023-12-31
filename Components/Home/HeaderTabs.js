import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function HeaderTabs(props) {

  return (
    <View style={{flexDirection:'row', alignSelf:'center'}}>
      <HeaderButtons 
      text='Delivery' 
      backColor='black' 
      textColor='white' 
      activeTab={props.activeTab} 
      setActiveTab={props.setActiveTab} />
      <HeaderButtons 
      text='Pickup' 
      backColor='white' 
      textColor='black'      
      activeTab={props.activeTab} 
      setActiveTab={props.setActiveTab}/>
    </View>
  );
}

const HeaderButtons = (props) =>( 
    <TouchableOpacity
    style={{backgroundColor: props.activeTab === props.text ? 'black' : 'white',
            paddingVertical:6,
            paddingHorizontal: 16,
            borderRadius:30,}}

    onPress={() => props.setActiveTab(props.text)}
    >
     <Text
     style={{color:props.activeTab === props.text ? 'white' : 'black',
            fontSize:15,
            fontWeight:'900',}}
     >{props.text}</Text>
    </TouchableOpacity>
);
