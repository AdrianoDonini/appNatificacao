import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator, Button, TouchableOpacity, TextInput } from 'react-native';
import { addDoc, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"; 
import db from "../services/firebase";
import ProductsList from "./productsList";
import { Dialog } from 'react-native-simple-dialogs';
import { schedulePushNotification } from "./notificacao";
import Icon from 'react-native-vector-icons/Ionicons';

const Separator = () => <View style={styles.separator} />;

export default function ProductManager() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [telaListar, setTelaListar] = useState(true);
  const [key, setKey] = useState('');
  const [toEdit, setToEdit] = useState(false);
  const [keytoDelet, setKeytoDelet] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [avisoNome, setAvisoNome] = useState(false);
  const [avisoDescricao, setAvisoDescricao] = useState(false);
  const [avisoMarca, setAvisoMarca] = useState(false);
  const [avisoPreco, setAvisoPreco] = useState(false);
  const [avisoTipoPreco, setAvisoTipoPreco] = useState(false);

  // Estado para gerenciar a cor da borda de cada input
  const [borderColors, setBorderColors] = useState({
    nome: '#000',
    descricao: '#000',
    marca: '#000',
    preco: '#000',
  });

  const handleBlur = (field) => {
    setBorderColors((prevColors) => ({
      ...prevColors,
      [field]: prevColors[field] === '#000' && !getInputValue(field) ? 'red' : '#000',
    }));
  };

  const handleFocus = (field) => {
    setBorderColors((prevColors) => ({
      ...prevColors,
      [field]: '#000',
    }));
  };

  const getInputValue = (field) => {
    switch (field) {
      case 'nome':
        return nome;
      case 'descricao':
        return descricao;
      case 'marca':
        return marca;
      case 'preco':
        return preco;
      default:
        return '';
    }
  };
function clearWarnings(){
 setAvisoDescricao(false);
 setAvisoMarca(false);
 setAvisoNome(false);
 setAvisoPreco(false);
 setAvisoTipoPreco(false);
}
  async function Cadastrar() {
    const valor = /^\d+,\d{2}$/;
    if(nome=='') {
      console.log(nome);
      setAvisoNome(true);
      return;
    }
    if(descricao=='') {
      setAvisoDescricao(true);
      return;
    }
    if(marca=='') {
      setAvisoMarca(true);
      return;
    }
    if(preco=='') {
      setAvisoPreco(true);
      return;
    }
    if(!(valor.test(preco))){
      setAvisoTipoPreco(true);
      return;
    }

    
      try {
        const docRef = await addDoc(collection(db, "products"), {
          nome: nome,
          descricao: descricao,
          marca: marca,
          preco: preco,
        });
        clearData();
        setProducts((prevProducts) => [
          {
            key: docRef.id,
            nome: nome,
            descricao: descricao,
            marca: marca,
            preco: preco,
          },
          ...prevProducts,
        ]);
        await Listar();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      schedulePushNotification();
      setTelaListar(true);
  }

  async function Editar() {
    const valor = /^\d+,\d{2}$/;
    if(nome=='') {
      console.log(nome);
      setAvisoNome(true);
      return;
    }
    if(descricao=='') {
      setAvisoDescricao(true);
      return;
    }
    if(marca=='') {
      setAvisoMarca(true);
      return;
    }
    if(preco=='') {
      setAvisoPreco(true);
      return;
    }
    if(!(valor.test(preco))){
      setAvisoTipoPreco(true);
      return;
    }
    try {
      const docRef = doc(db, "products", key);
      await setDoc(docRef, {
        nome: nome,
        descricao: descricao,
        marca: marca,
        preco: preco,
      });
      clearData();

      const updatedProducts = products.map((item) =>
        item.key === key ? { ...item, nome, descricao, marca, preco } : item
      );
      setProducts(updatedProducts);

      await Listar();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTelaListar(true);
  }

  function clearData() {
    setNome("");
    setDescricao("");
    setMarca("");
    setPreco("");
  }

  function handleEdit(data) {
    setToEdit(true);
    setTelaListar(false);
    setKey(data.key);
    setNome(data.nome);
    setDescricao(data.descricao);
    setMarca(data.marca);
    setPreco(data.preco);
  }

  const Listar = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "products"));
    const produtos = [];
    querySnapshot.forEach((doc) => {
      produtos.push({
        key: doc.id,
        nome: doc.data().nome,
        descricao: doc.data().descricao,
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

  // função para setar o id que vai ser deletado e mostrar o dialogo de confirmação
  const handleDeleteItem = (keyItem) => {
    setKeytoDelet(keyItem);
    setShowDialog(true);
    console.log("Setar para deletar" + keyItem);
  };

  //função para excluir um item 
  async function handleDelete() {
    await deleteDoc(doc(db, "products", keytoDelet));
    setShowDialog(false);
    setKeytoDelet("");
    console.log("Delete" + keytoDelet);
    await Listar();
  }

  function Cancel(){
    setTelaListar(true);
    clearData();
  }

  return (
    telaListar ? (
      <View style={styles.listar}>
        <Pressable style={{backgroundColor:"#0078d4", paddingVertical:10, paddingHorizontal:14, marginVertical:10, borderRadius:10}} onPress={() => { setTelaListar(false); setToEdit(false); }}>
          <Icon name="add-circle" color="#fff" size={20}>  Novo Produto</Icon>
        </Pressable>
        <View style={styles.flatList}>
          {loading ? (
            <ActivityIndicator color="#121212" size={45} />
          ) : (
            <FlatList
              keyExtractor={(item) => item.key}
              data={products}
              renderItem={({ item }) => (
                <ProductsList data={item} editItem={() => handleEdit(item)} deleteItem={() => handleDeleteItem(item.key)} />
              )}
            />
          )}
        </View>
        <Dialog
          visible={showDialog}
          onTouchOutside={() => setShowDialog(false)}
          title="Confirmar Exclusão"
          animationType="fade"
          contentStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <View>
            <Text>Deseja realmente excluir este item?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <Button title="Cancelar" onPress={() => setShowDialog(false)} />
              <Button title="Confirmar" onPress={() => { handleDelete() }} />
            </View>
          </View>
        </Dialog>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={{fontWeight:600, fontSize:16,}}>Nome do Produto:</Text>
        <TextInput
          placeholder='Digite ...'
          left={() => <TextInput.Icon icon="book-open" />}
          maxLength={40}
          style={[styles.input, { borderColor: borderColors.nome }]}
          onChangeText={(texto) => setNome(texto)}
          value={nome}
          onBlur={() => handleBlur('nome')}
          onFocus={() => {handleFocus('nome'); clearWarnings()}}
        />
        {avisoNome ? (<Text>Preencha Este campo!!</Text>):<Text></Text>}
        <Text style={{fontWeight:600, fontSize:16,}}>Descrição do Produto:</Text>
        <TextInput
          placeholder='Digite ...'
          left={() => <TextInput.Icon icon="book-open" />}
          maxLength={100}
          style={[styles.input, { borderColor: borderColors.descricao }]}
          onChangeText={(texto) => setDescricao(texto)}
          value={descricao}
          onBlur={() => handleBlur('descricao')}
          onFocus={() => {handleFocus('descricao'); clearWarnings()}}
        />
        {avisoDescricao ? (<Text>Preencha Este campo!!</Text>):<Text></Text>}
        <Text style={{fontWeight:600, fontSize:16,}}>Marca:</Text>
        <TextInput
          placeholder='Digite ...'
          left={() => <TextInput.Icon icon="book-open" />}
          maxLength={40}
          style={[styles.input, { borderColor: borderColors.marca }]}
          onChangeText={(texto) => setMarca(texto)}
          value={marca}
          onBlur={() => handleBlur('marca')}
          onFocus={() => {handleFocus('marca'); clearWarnings()}}
        />
        {avisoMarca ? (<Text>Preencha Este campo!!</Text>):<Text></Text>}
        <Text style={{fontWeight:600, fontSize:16,}}>Preço:</Text>
        <TextInput
          placeholder='Digite ...'
          left={() => <TextInput.Icon icon="book-open" />}
          maxLength={40}
          style={[styles.input, { borderColor: borderColors.preco }]}
          onChangeText={(texto) => setPreco(texto)}
          value={preco}
          onBlur={() => handleBlur('preco')}
          onFocus={() =>  {handleFocus('preco'); clearWarnings()}}
        />
        {avisoPreco ? (<Text>Preencha Este campo!!</Text>):<Text></Text>}
        {avisoTipoPreco ? (<Text>Digite apenas Valores em formato moeda!! Ex: 89,90</Text>):<Text></Text>}
        <Separator />
        {toEdit ? (
          <View style={styles.containerBtns}>
            <TouchableOpacity onPress={Cancel} style={styles.bntCancel}>
             <Icon name="close-circle" color="#000" size={20}>  Cancelar</Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={Editar} style={styles.button} activeOpacity={0.5}>
              <Icon name="create" color="#fff" size={20}>  Salvar</Icon>
            </TouchableOpacity>
          </View>

        ) : (
          <View style={styles.containerBtns}>
            <TouchableOpacity onPress={Cancel} style={styles.bntCancel}>
             <Icon name="close-circle" color="#000" size={20}>  Cancelar</Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={Cadastrar} style={styles.button} activeOpacity={0.5}>
            <Icon name="add-circle" color="#fff" size={20}>  Cadastrar</Icon>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  bntCancel:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    height: 40,
    borderRadius: 5,
    backgroundColor:"#fff",    
    borderColor:"#fff",
    marginHorizontal:8,
  },
  button: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#3838ed',
    height: 40,
    borderRadius: 5,
    borderColor:"#3838ed",
    marginHorizontal:8,
  },
  button1: {
    padding: 10,
    backgroundColor: '#2196F3',
    color: 'white',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#bbb",
  },
  containerBtns:{
    flex:1,
    flexDirection:"row",
  },
  input: {
    paddingHorizontal: 4,
    borderRadius: 16,
    height: 45,
    fontSize: 16,
    margin: 5,
    backgroundColor: "#fff",
    borderWidth: 1, // Definir a largura da borda
  },
  separator: {
    marginVertical: 5,
  },

  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    width: "100%",
    fontSize: 20,
    textAlign: 'center',
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 20,
  },
  lista: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    width: "100%",
  },
  listar: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  flatList: {
    flex: 1,
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
