import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/*        <Image 
          source={{ uri: data.image }} 
          style={styles.capa} 
          />
 */
export default function HomeList({ data}){
  return(
<View style={styles.container}>
    <View>
        <Text style={styles.text}>Nome: {data.nome}</Text>
        <Text style={styles.text}>Marca: {data.nome}</Text>
        <Text style={styles.text}>Descrição: {data.nome}</Text>
        <Text style={styles.text}>Preço: {data.nome}</Text>
    </View>    
</View>

  )
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    marginTop: 1,
    marginBottom: 5,
    width:380,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:10,
  },
  card:{
    width:"70%",
    flex:1
  },
  text:{
    color:'black',
    fontSize: 17
  },
  item: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'space-around',
    alignItems:"flex-end",
    marginRight:8,
  },
  txtBtn:{
    color:"#fff",
    paddingVertical:10,
    width:90,
    textAlign:"center"
  }
});