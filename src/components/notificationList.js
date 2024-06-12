import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'; 

export default function NotificationList({data}){
  console.log(data.preco);
  return( 
    <View> 
      <View style={styles.card}>
      <Text style={[styles.text, {fontWeight:600, width:"100%", textAlign:"center", color:"#0b57d0"}]}>{data.titulo}</Text>
        <View>
        <Text style={styles.text}>NOME: {data.nome}</Text>
        <Text style={styles.text}>MARCA: {data.marca}</Text> 
        <Text style={styles.text}>PRECO: {data.preco}</Text>
        </View>
      </View> 
   </View> 
  );
};

const styles = StyleSheet.create(
  { 
    bold:{
      fontWeight:650,
    },
    card:{
      marginTop:12,
      marginHorizontal:"5%",
      width:"90%",
      backgroundColor:"#fff",
      borderRadius:10,
    },
    text:{
      fontSize: 18, 
      padding: 15, 
    }
  }
)
    
