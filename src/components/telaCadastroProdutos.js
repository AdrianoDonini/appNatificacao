import { addDoc, collection, getDocs } from "firebase/firestore"; 
import db from "../services/firebase";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button, Pressable} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import ProductsList from "./productsList";
import { updateDoc } from "firebase/firestore/lite";

const Separator = () => {
  return <View style={StyleSheet.separator} />
}

export default function TelaCadastroProduto(){
    let [nome, setNome] = useState("");
    let [descricao, setDescricao] = useState("");
    let [marca, setMarca] = useState("");
    let [preco, setPreco] = useState("");
    let [products, setProducts] = useState([]);
    let [loading, setLoading] =  useState(true);
    let [telaListar, setTelaListar] = useState(true);
    let [key, setKey] = useState('');
    let [toEdit, setToIdit] = useState(false);
        async function Cadastrar(){
            try {
                const docRef = await addDoc(collection(db, "products"), {
                  nome: nome,
                  descricao: descricao,
                  marca: marca,
                  preco: preco
                });
                clearData();
                
                setProducts(prevProducts => [{
                    key: docRef.id,
                    nome: nome,
                    descricao: descricao,
                    marca: marca,
                    preco: preco
                }, ...prevProducts]);
    
           
                await Listar();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setTelaListar(true);
        }
        return(
            <View style={styles.container}>

                <TextInput
                    placeholder="Nome do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setNome(texto)}
                    
                />
                <TextInput
                    placeholder="Descrição do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={100}
                    style={styles.input}
                    onChangeText={(texto) => setDescricao(texto)}
                    
                />
                <TextInput
                    placeholder="Marca"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setMarca(texto)}
                    
                />
                <TextInput
                    placeholder="Preço"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setPreco(texto)}
                    
                />
                <Separator />
                <TouchableOpacity onPress={Cadastrar} style={styles.button} activeOpacity={0.5}>
                        <Text style={styles.buttonTextStyle}>Cadastrar</Text>
                </TouchableOpacity>
                </View>
        )
    }
