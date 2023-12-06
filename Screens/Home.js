import { SafeAreaView, ScrollView, StyleSheet ,Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../Components/Home/HeaderTabs';
import SearchBar from '../Components/Home/SearchBar';
import Categories from '../Components/Home/Categories';
import RestaurantItems, { localRestaurants } from '../Components/Home/RestaurantItems';
import { Divider } from 'react-native-elements';
import BottomTabs from '../Components/Home/BottomTabs';

const YELP_API_KEY =
 "dcTIMsg0LtgcSYvvcT1Iqelb8WiO7v_H6szxehpVpe442AouVvMFV-t247QhnFv_2dIm8Kdi5EV40eIQlXOQv7rTw_EZvPUJbnKUofc3M47_GIHU38cKnpdXlNZIZXYx"

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants)

    const [activeTab, setActiveTab] = useState('Delivery');

    const [city, setCity] = useState('San Francisco');

    const getRestaurantsFromYelp = () => {
        const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurant&location=${city}`
    
        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            } 
        }
        return fetch(yelpurl, apiOptions)
        .then((res) => res.json())
        .then(json =>
            setRestaurantData(
              json.businesses.filter((business) =>
                 business.transactions.includes(activeTab.toLocaleLowerCase())
                )
            )
        )
};

useEffect(() => {
    getRestaurantsFromYelp();
}, [city, activeTab])

  return (
    <SafeAreaView 
    style={styles.view}>
        <View style={{backgroundColor:'white', padding:15}}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <SearchBar cityHandler={setCity}/>
        </View> 
        <ScrollView showsVerticalScrollIndicator={false}>
            <Categories/>
            <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
        </ScrollView>
        <Divider width={1} />
        <BottomTabs/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        paddingTop:10,
        backgroundColor:'#eee',

    }
})