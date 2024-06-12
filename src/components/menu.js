import React, { useState, useEffect } from 'react';
import { Button, View,Text,StyleSheet, ImageBackground, ScrollView,SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator,Image} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import ProductManager from './products';
import {NotificationScreem} from './notificacao';
import HomeList from './homeList';

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
     
      <SafeAreaView style={styles.contentMain}>
        <ImageBackground
        source={ require('../../assets/loja-virtual.jpg')}
        style={styles.background}
      >
        <View style={styles.navContainer}>
          <Text style={styles.text}>Multielectro Eletronics</Text>
        </View>
      </ImageBackground>
      </SafeAreaView>
      <TouchableOpacity onPress={()=> navigation.navigate('Produtos')}><Text style={styles.button}>Mais Produtos</Text></TouchableOpacity>
      <View style={styles.publi}>
        <View style={styles.card}>
          <Text style={{fontWeight:600, fontSize:18, width:"100%", textAlign:"center"}}>Mouse RedDragon Cobra</Text>
          <View style={styles.cardDescription}>
            <Image
            source={require('../../assets/loja-virtual.jpg')}
            style={styles.image}
                /> 
            <Text>Muse Gamer RedDragon 10.000 DPI</Text> 
            <Text>Preço:</Text>
            <Text>R$ 210,50</Text>
          </View>
          <View style={styles.btns}>
          <TouchableOpacity><Text style={{width:100, textAlign:"center", paddingVertical:8, backgroundColor:"#003b95", borderRadius:8, color:"#fff"}}>Ver Detalhes</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{width:100, textAlign:"center", paddingVertical:8, backgroundColor:"#ffe700", borderRadius:8,}}>Comprar</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <NotificationScreem/>
  );
}

function ProductsScreen({ navigation }) {
  return (
    <ProductManager/>
    
  );
}

const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#bbb',
    backgroundColor:'#bbb',
    primary:'#0c459f',
    border:'#0c459f',
    notification:'#fa0',
    card:'#0c459f',
    text:"#fff"
  },
};

export default function MenuDrawer() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Home" style={styles.navContainer}
       screenOptions={{
        drawerStyle: {
          backgroundColor: '#5FB7FA',
        },
        headerTintColor: "#fff",
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} 
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#bbb',
          },}}/>
        <Drawer.Screen name="Produtos" component={ProductsScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  }

const styles = StyleSheet.create({
  publi:{
    width:"100%",
    height:"auto",
  },
  btns:{
    flex:1,
    flexDirection:"row",
    justifyContent:'space-around',
    width:"90%",
    height:"auto",
    marginHorizontal:"5%",
    marginTop:15
  },
  cardDescription:{
    width:"80%",
    marginHorizontal:"10%",
    height:"auto",
  },
  card:{
    marginTop:15,
    width:"90%",
    marginHorizontal:"5%",
    height:350,
    backgroundColor:"#ddd",
    borderRadius:10,
    padding:10,
  },
  image:{
    width:"100%",
    height:200,
  },
  contentMain:{
    width:"100%",
    height:500,
    backgroundColor:"#fff"
  },
  container: {
    height:2000,
    backgroundColor: '#fff',
  },
  navContainer:{
    flex:1,
    width:"100%",
    height:500,
    backgroundColor:"#0000001a"
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width:"auto",
    height:500,
  },
  text:{
    width:"100%",
    color:"#fff",
    fontSize:30,
    fontFamily:"Roboto",
    textAlign:"center",
  },
  button:{
    marginTop:20,
    marginHorizontal:"30%",
    flex:1,
    borderRadius:10,
    textAlign:"center",
    width:"40%",
    backgroundColor:"#00a47b",
    padding:15
  }
})