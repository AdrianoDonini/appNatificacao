import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuDrawer from './src/components/menu';

export default function App() {
 

  return <MenuDrawer />;
}
