import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'; 

export default function NotificationList({data}){
  console.log(data.preco);
  return( 
    <View> 
      <View style={styles.card}>
      <Text style={[styles.text, {fontWeight:600, width:"100%", textAlign:"center"}]}>Produto Novo!!!</Text>
        <Text style={styles.text}>Nome: {data.nome}</Text>
        <Text style={styles.text}>Marca: {data.marca}</Text> 
        <Text style={styles.text}>Preco: {data.preco}</Text>    
      </View> 
   </View> 
  );
};

const styles = StyleSheet.create(
  { 
    text:{
      fontSize: 18, 
      padding: 15, 
    }
  }
)
    
