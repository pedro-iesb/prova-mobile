import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  FAB,
  MD3Colors,
  Portal,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ListaCardapios({ navigation, route }) {
  const [cardapios, setCardapios] = useState([]);
  const [showModalExcluirCardapio, setShowModalExcluirCardapio] = useState(false);
  const [cardapioASerExcluido, setCardapioASerExcluido] = useState(null);

  useEffect(() => {
    loadCardapios();
  }, []);

  async function loadCardapios() {
    const response = await AsyncStorage.getItem("cardapios");
    console.log(
      "🚀 ~ file: ListaCardapiosAsyncStorage.js:21 ~ loadCardapios ~ response:",
      response
    );
    const cardapiosStorage = response ? JSON.parse(response) : [];
    setCardapios(cardapiosStorage);
  }

  const showModal = () => setShowModalExcluirCardapio(true);

  const hideModal = () => setShowModalExcluirCardapio(false);

  async function adicionarCardapio(cardapio) {
    let novaListaCardapios = cardapios;
    novaListaCardapios.push(cardapio);
    await AsyncStorage.setItem("cardapios", JSON.stringify(novaListaCardapios));
    setCardapios(novaListaCardapios);
  }

  async function editarCardapio(cardapioAntigo, novosDados) {
    console.log("CARDAPIO ANTIGO -> ", cardapioAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaCardapios = cardapios.map((cardapio) => {
      if (cardapio == cardapioAntigo) {
        return novosDados;
      } else {
        return cardapio;
      }
    });

    await AsyncStorage.setItem("cardapios", JSON.stringify(novaListaCardapios));
    setCardapios(novaListaCardapios);
  }

  async function excluirCardapio(cardapio) {
    const novaListaCardapios = cardapios.filter((p) => p !== cardapio);
    await AsyncStorage.setItem("cardapios", JSON.stringify(novaListaCardapios));
    setCardapios(novaListaCardapios);
    Toast.show({
      type: "success",
      text1: "Cardápio excluído com sucesso!",
    });
  }

  function handleExluirCardapio() {
    excluirCardapio(cardapioASerExcluido);
    setCardapioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Cardápios
      </Text>

      <FlatList
        style={styles.list}
        data={cardapios}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyLarge">Entrada: {item?.entrada}</Text>
                <Text variant="bodyLarge">Pratos Principal: {item?.principal}</Text>
                <Text variant="bodyLarge">Sobremesa: {item.sobremesa}</Text>
                <Text variant="bodyLarge">Bebida: {item.bebidas}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormCardapio", {
                    acao: editarCardapio,
                    cardapio: item,
                  })
                }
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setCardapioASerExcluido(item);
                  showModal();
                }}
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.push("FormCardapio", { acao: adicionarCardapio })
        }
      />

      {/* Modal Excluir Cardápio */}
      <Portal>
        <Dialog visible={showModalExcluirCardapio} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza que deseja excluir este cardápio?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirCardapio}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFF9C4'
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: "90%",
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
});
