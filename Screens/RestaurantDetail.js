import { Text, View } from 'react-native'
import React from 'react'
import { Divider, Image } from 'react-native-elements'
import About from '../Components/RestaurantDetail/About'
import MenuItems from '../Components/RestaurantDetail/MenuItems'
import ViewCart from '../Components/RestaurantDetail/ViewCart'

const foods= [
  {
      title: 'Parrillada de entrada',
      description: 'Typical asado´s entry.',
      price: '$10.25',
      image: 
      'https://laopinionaustral.com.ar/media/uploads/2023/08/fot1.webp'
  },
  {
      title: 'Matambre a la Pizza',
      description: 'One of the best Argentinian plate´s.',
      price: '$19.20',
      image: 
      'https://assets.elgourmet.com/wp-content/uploads/2023/03/matam_m3Y07VoW9Uu6ZAMEleDbxyiGNk8aFQ.png'
  },

  {
      title: 'Sandwich de Bondiola',
      description: 'Delicious sandwich with "Bondiola desmenuzada".',
      price: '$14.50',
      image: 
      'https://cocinerosargentinos.com/content/recipes/original/recipes.12189.jpeg'
  },
  {
      title: 'Vacio',
      description: 'Most famous and delicious plates.',
      price: '$21.50',
      image: 
      'https://api.carneargentina.org.ar/web/uploads/recipes/58/gallery/0-desktop.webp?1667233050'
  },
  {
      title: 'Tabla de Achuras',
      description: 'Serving board full with Grill "Achuras".',
      price: '$20.25',
      image: 
      'https://i.ytimg.com/vi/y9CTSxSRdAM/maxresdefault.jpg'
  },
];


export default function RestaurantDetail({ route, navigation }) {

  return (
    <View>
        <About route={route}/>
        <Divider width={1.8} style={{marginVertical: 20 }}/>
        <MenuItems restaurantName={route.params.name} foods={foods}/>
        <ViewCart navigation={navigation}/>
    </View>
  )
};
