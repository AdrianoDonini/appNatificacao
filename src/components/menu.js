import * as React from 'react';
import { Button, View,Text,StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import ProductManager from './products';
import NotificationScreem from './notificacao';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
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
    primary:'#ff0',
    border:'#f00',
    notification:'#fa0',
    card:'#af0'
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
  navContainer:{
    backgroundColor: "Black",
  }
})