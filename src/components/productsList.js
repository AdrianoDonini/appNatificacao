import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
export default function ProductsList({ data, deleteItem, editItem }){
  return(
<View style={styles.container}>
    <View>
      <Text style={styles.text}>Nome:</Text>
      <Text style={styles.text}>  {data.nome}</Text>
      <Text style={styles.text}>Preço:</Text>
      <Text style={styles.text}>   {data.preco}</Text>
    </View>
    <View style={styles.item}>
        <TouchableOpacity style={{backgroundColor:"#e83b3b", borderRadius:10}} onPress={()=> deleteItem(data.key)}>
        <Text style={styles.txtBtn}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#058d20", borderRadius:10}} onPress={() => editItem(data)}>
        <Text style={styles.txtBtn}>Editar</Text>
        </TouchableOpacity>
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