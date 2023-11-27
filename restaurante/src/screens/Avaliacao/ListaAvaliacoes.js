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

export default function ListaAvaliacoes({ navigation, route }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showModalExcluirAvaliacao, setShowModalExcluirAvaliacao] = useState(false);
  const [avaliacaoASerExcluida, setAvaliacaoASerExcluida] = useState(null);

  useEffect(() => {
    loadAvaliacoes();
  }, []);

  async function loadAvaliacoes() {
    const response = await AsyncStorage.getItem("avaliacoes");
    console.log(
      "🚀 ~ file: ListaAvaliacoesAsyncStorage.js:21 ~ loadAvaliacoes ~ response:",
      response
    );
    const avaliacoesStorage = response ? JSON.parse(response) : [];
    setAvaliacoes(avaliacoesStorage);
  }

  const showModal = () => setShowModalExcluirAvaliacao(true);

  const hideModal = () => setShowModalExcluirAvaliacao(false);

  async function adicionarAvaliacao(avaliacao) {
    let novaListaAvaliacoes = avaliacoes;
    novaListaAvaliacoes.push(avaliacao);
    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
  }

  async function editarAvaliacao(avaliacaoAntiga, novosDados) {
    console.log("AVALIACAO ANTIGA -> ", avaliacaoAntiga);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaAvaliacoes = avaliacoes.map((avaliacao) => {
      if (avaliacao == avaliacaoAntiga) {
        return novosDados;
      } else {
        return avaliacao;
      }
    });

    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
  }

  async function excluirAvaliacao(avaliacao) {
    const novaListaAvaliacoes = avaliacoes.filter((p) => p !== avaliacao);
    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
    Toast.show({
      type: "success",
      text1: "Avaliação excluída com sucesso!",
    });
  }

  function handleExluirAvaliacao() {
    excluirAvaliacao(avaliacaoASerExcluida);
    setAvaliacaoASerExcluida(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Avaliações
      </Text>

      <FlatList
        style={styles.list}
        data={avaliacoes}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Cardápio: {item?.cardapio}</Text>
                <Text variant="titleMedium">Atendimento: {item?.atendimento}</Text>
                <Text variant="bodyLarge">Preparo: {item?.preparo}</Text>
                <Text variant="bodyLarge">Reservas: {item?.reservas}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormAvaliacao", {
                    acao: editarAvaliacao,
                    avaliacao: item,
                  })
                }
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setAvaliacaoASerExcluida(item);
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
          navigation.push("FormAvaliacao", { acao: adicionarAvaliacao })
        }
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirAvaliacao} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza que deseja excluir esta avaliacao?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirAvaliacao}>Tenho Certeza</Button>
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
