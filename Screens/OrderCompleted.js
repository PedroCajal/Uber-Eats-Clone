import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase, { db } from '../firebase';
import { collection, orderBy, limit, onSnapshot, query } from "firebase/firestore";
import MenuItems from "../Components/RestaurantDetail/MenuItems";

export default function OrderCompleted() {

    
    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: 'Bologna',
                description: 'With butter lettuce, tomato and sauce bechart',
                price: '$13.50',
                image:'https://www.2foodtrippers.com/wp-content/uploads/2017/12/Osteria-Broccaindosso-Tagliatelle-with-Ragu-Bolognese-Bologna-Food-Guide.jpg'
            }
        ]
    })

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total= items
        .map((item => Number(item.price.replace('$', ''))))
        .reduce((prev, curr) => prev + curr, 0);


    const totalUSD= total.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(1))
        
        const unsucribe = onSnapshot(q, (snapshot) => {
            snapshot.docs.map((doc) => {
                setLastOrder(doc.data())
            })
        })

        return () =>  unsucribe();
    }, []);
    return( 
        <SafeAreaView style={{flex:1 ,backgroundColor:'white'}}>
            <View style={{
                marginTop:20
            }}>
                <LottieView
                style={{height:80,
                    marginBottom:30
                }}
                source={require('../Assets/Animations/check-mark.json')}
                autoPlay
                speed={0.5}
                loop={false}/>
                <Text style={{
                    fontSize:20,
                    fontWeight:'bold'
                }}>
                    Your order at {restaurantName} has been placed for {totalUSD}
                </Text>
                <ScrollView>
                    <MenuItems foods={lastOrder.items} hideCheckbox={true}/>
                    <LottieView
                    style={{
                        height:100
                    }}
                    source={require('../Assets/Animations/cooking.json')}
                    autoPlay
                    speed={0.5}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}