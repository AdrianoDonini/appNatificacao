import { useState, useEffect, useRef, useCallback  } from 'react';
import { Text, View, Button, Platform, FlatList,ActivityIndicator,RefreshControl } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { addDoc, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"; 
import db from "../services/firebase";
import NotificationList from './notificationList';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function NotificationScreem() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  
  const [loading, setLoading] = useState<boolean>(true);
  interface elemento{
    key:string,
    titulo:string,
    nome:string,
    marca:string,
    preco:string
  }
  const [products, setProducts] = useState<elemento[]>([]);

  

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification.request.content);
      AddNotifications(notification.request.content.title, notification.request.content.body, notification.request.content.data.marca, notification.request.content.data.preco);
      Listar();
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function AddNotifications(titulo:string,nome:string, marca:string, preco:string) {
    try {
      await addDoc(collection(db, "notifications"), {
        titulo:titulo,
        nome: nome,
        marca: marca,
        preco: preco,
      })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const Listar = async () => {
    setLoading(true);
    
    const querySnapshot = await getDocs(collection(db, "notifications"));
     let produtos:elemento[] = [];
    querySnapshot.forEach((doc) => {
      produtos.push({
        key:doc.id,
        titulo: doc.data().titulo,
        nome: doc.data().nome,
        marca: doc.data().marca,
        preco: doc.data().preco,
      });
    });
    setProducts(produtos.reverse());
    setLoading(false);
  };

  useEffect(() => {
    Listar();
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      Listar();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <Button title='Chamar Notificação' onPress={() => chamarNotificacao("test","testMarca", "10,00")} />
      {loading ? (
            <ActivityIndicator color="#121212" size={45} />
          ) : (
            <FlatList
              keyExtractor={(item) => item.key}
              data={products}
              renderItem={({ item }) => (
                <NotificationList data={item}  />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
    </View>
  );
}

async function chamarNotificacao(produto:string, marca:string, preco:string) {
  try {
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Confira nosso novo produto!!!",
        body: produto,
        data: {marca, preco},
      },
      trigger: {
        seconds: 1,
      },
    });
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
  console.log("Notificação Chamada", produto);
  
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


  


export { chamarNotificacao };
