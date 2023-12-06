import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'

const items = [
    {
        image: require("../../Assets/Images/shopping-bag.png"),
        text:'Pick-up',
    },
    {
        image: require("../../Assets/Images/soft-drink.png"),
        text:'Soft Drinks',
    },
    {
        image: require("../../Assets/Images/bread.png"),
        text:'Bakery Items',
    },
    {
        image: require("../../Assets/Images/fast-food.png"),
        text:'Fast Foods',
    },
    {
        image: require("../../Assets/Images/deals.png"),
        text:'Deals',
    },
    {
        image: require("../../Assets/Images/coffee.png"),
        text:'Coffee & Tea',
    },
    {
        image: require("../../Assets/Images/desserts.png"),
        text:'Desserts',
    },
] 


export default function Categories() {

    return(
        <View style={{
            marginTop:5,
            backgroundColor:'white',
            paddingVertical:10,
            paddingLeft:20
        }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <View key={index} style={{alignItems:'center', marginRight:30}}>
                        <Image source={item.image} style={{
                            width:50,
                            height:40,
                            resizeMode:'contain',
                        }}/>
                        <Text  style={{fontSize:13, fontWeight:'900'}}>{item.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}