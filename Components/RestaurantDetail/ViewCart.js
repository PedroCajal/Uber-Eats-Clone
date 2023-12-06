import React, { useState} from "react";
import { Text, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase, { db } from '../../firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import LottieView from 'lottie-react-native';


export default function ViewCart({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total= items
        .map((item => Number(item.price.replace('$', ''))))
        .reduce((prev, curr) => prev + curr, 0);


    const totalUSD= total.toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
    });


    const addOrderToFireBase = () => {
        setLoading(true)
        const docRef = addDoc(collection(db, 'orders'),{
            items: items,
            restaurantName: restaurantName,
            createdAt: Timestamp.fromDate(new Date()),
        }).then(() => {
            setTimeout(() => {
                setLoading(false);
                navigation.navigate('OrderCompleted');
            }, 2500)
        });
    };

    const styles=StyleSheet.create({
        modalContainer:{
            flex:1,
            justifyContent:'flex-end',
            backgroundColor:'rgba(0,0,0,0.7)',
        },
        modalCheckOutContainer:{
            backgroundColor:'white',
            padding:16,
            height:500,
            borderWidth:1
        },
        restaurantName:{
            textAlign:'center',
            fontWeight:'600',
            fontSize:18,
            marginBottom:10
        },
        subtotalContainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:15
        },
        subtotalText:{
            textAlign:'left',
            fontWeight:'600',
            fontSize:15,
            marginBottom:10
        }
    });


    const checkOutModalContent = () => {
        return(
            <>            
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckOutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        {items.map((item, index) => (
                            <OrderItem key={index} item={item}/>
                        ))}
                        <View style={styles.subtotalContainer}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text>{totalUSD}</Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'center'
                        }}>
                            <TouchableOpacity style={{
                                marginTop:20,
                                backgroundColor:'black',
                                alignItems:'center',
                                padding:13,
                                borderRadius:30,
                                width:300,
                                position:'relative',
                            }}
                            onPress={() => {
                                addOrderToFireBase();
                                setModalVisible(false);}}>
                                <Text style={{color:'white', fontSize:20}}>Checkout</Text>
                                <Text style={{
                                    position:'absolute',
                                    right:20,
                                    fontSize:15,
                                    top:15,
                                    color:'white'}}>{total ? totalUSD : ''}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    };

    return(
        <>
        <Modal 
        animationType="slide"
        visible={modalVisible}
        transparent={true} 
        onRequestClose={() => setModalVisible(false)}
        >
            {checkOutModalContent()}
        </Modal>
        {total ? (
        <View style={{
            flex:1,
            alignItems:'center',
            flexDirection:'row',
            position:'absolute',
            justifyContent:'center',
            bottom:10,
            zIndex:999,
        }}>
            <View style={{
                flexDirection:'row',
                justifyContent:'center',
                width:'100%',

            }}>
                <TouchableOpacity style={{
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'flex-end',
                    backgroundColor: 'black',
                    alignItems:'center',
                    padding:15,
                    borderRadius:30,
                    width:300,
                    position:'relative',
                }}
                onPress={() => setModalVisible(true)}>
                    <Text style={{color:'white', fontSize:20, marginRight:30}}>ViewCart</Text>
                    <Text style={{color:'white', fontSize:20}}>{totalUSD}</Text>
                </TouchableOpacity>
            </View>
        </View>
        ) : (<></>)}
        {loading ? (
        <View style={{
            backgroundColor:'black',
            position:'absolute',
            right:0,
            left:0,
            justifyContent:'center',
            height:'100%',
            width:'100%',
            opacity:0.6
            }}>
            <LottieView 
            style={{height:200, alignContent:'center'}} 
            source={require('../../Assets/Animations/scanner.json')}
            autoPlay
            speed={3}/>
        </View>) : (<></>)}
        </>
     )
};