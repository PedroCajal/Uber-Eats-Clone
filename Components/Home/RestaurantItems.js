import { Image, Text,  TouchableOpacity,  View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const localRestaurants= [
    {
        name: 'Beachside Bar',
        image_url: 'https://s03.s3c.es/imag/_v0/770x420/e/6/a/atenas-playa-chiringuito-1.jpg',
        categories: ['Cafe', 'Bar'],
        price:'$$',
        reviews:1244,
        rating: 4.5,
    },
    {
        name: 'Benihana',
        image_url: 'https://www.playadelcarmen.com/blog/wp-content/uploads/zenzi-02-760x536.jpeg',
        categories: ['Cafe', 'Bar'],
        price:'$$',
        reviews:1244,
        rating: 3.7,
    },
    {
        name: 'Indias Grill',
        image_url: 'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2016/10/25/d460622c56b24ee990936e157491fc3b_Veeraswamy.jpg',
        categories: ['Indian', 'Bar'],
        price:'$$',
        reviews:700,
        rating: 4.9,
    }
]


export default function RestaurantItems({navigation, ...props}) {
    return(
        <>
        {props.restaurantData.map((restaurant, index) => (
                <TouchableOpacity key={index} activeOpacity={1} style={{marginBottom:30}} 
                onPress={() => navigation.navigate('RestaurantDetail', {
                    name: restaurant.name,
                    image: restaurant.image_url,
                    price: restaurant.price,
                    reviews: restaurant.review_count,
                    rating: restaurant.rating,
                    categories: restaurant.categories,
                })}>
                    <View  style={{marginTop:10, padding:15, backgroundColor:'white'}}>
                        <RestaurantImage image={restaurant.image_url}/>
                        <RestaurantInfo name={restaurant.name} rating={restaurant.rating}/>
                    </View>
                </TouchableOpacity>
            ))}
        </>
    );
}

const RestaurantImage = (props) => (
    <>
    <Image source={{
        uri: props.image}}
        style={{width:'100%', height:180}}
    />
    <TouchableOpacity style={{position:'absolute', right:20, top:20}}>
        <MaterialCommunityIcons name='heart-outline' size={25} color='#fff'/>
    </TouchableOpacity>
    </>
);

const RestaurantInfo = (props) => (
    <View style={{
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        marginTop:10}}>
        <View>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{props.name}</Text>
            <Text style={{fontSize:13, color:'gray'}}>30-45 · min</Text>
        </View>
        <View style={{
            backgroundColor:'#eee',
            height:30,
            width:30, 
            alignItems:'center',
            justifyContent:'center', 
            borderRadius:15}}>
            <Text >{props.rating}</Text>
        </View>
    </View>
);