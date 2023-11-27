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

export default function ListaFuncionarios({ navigation, route }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [showModalExcluirFuncionario, setShowModalExcluirFuncionario] = useState(false);
  const [funcionarioASerExcluido, setFuncionarioASerExcluido] = useState(null);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const response = await AsyncStorage.getItem("funcionarios");
    console.log(
      "🚀 ~ file: ListaFuncionariosAsyncStorage.js:21 ~ loadFuncionarios ~ response:",
      response
    );
    const funcionariosStorage = response ? JSON.parse(response) : [];
    setFuncionarios(funcionariosStorage);
  }

  const showModal = () => setShowModalExcluirFuncionario(true);

  const hideModal = () => setShowModalExcluirFuncionario(false);

  async function adicionarFuncionario(funcionario) {
    let novaListaFuncionarios = funcionarios;
    novaListaFuncionarios.push(funcionario);
    await AsyncStorage.setItem("funcionarios", JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function editarFuncionario(funcionarioAntigo, novosDados) {
    console.log("FUNCIONARIO ANTIGO -> ", funcionarioAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaFuncionarios = funcionarios.map((funcionario) => {
      if (funcionario == funcionarioAntigo) {
        return novosDados;
      } else {
        return funcionario;
      }
    });

    await AsyncStorage.setItem("funcionarios", JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function excluirFuncionario(funcionario) {
    const novaListaFuncionarios = funcionarios.filter((p) => p !== funcionario);
    await AsyncStorage.setItem("funcionarios", JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
    Toast.show({
      type: "success",
      text1: "Funcionário excluído com sucesso!",
    });
  }

  function handleExluirFuncionario() {
    excluirFuncionario(funcionarioASerExcluido);
    setFuncionarioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Funcionários
      </Text>

      <FlatList
        style={styles.list}
        data={funcionarios}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="titleMedium">Sobrenome: {item?.sobrenome}</Text>
                <Text variant="bodyLarge">CPF: {item?.cpf}</Text>
                <Text variant="bodyLarge">Salário: {item?.salario}</Text>
                <Text variant="bodyLarge">CEP: {item?.cep}</Text>
                <Text variant="bodyLarge">Endereço: {item?.endereco}</Text>
                <Text variant="bodyLarge">Telefone: {item.telefone}</Text>
                <Text variant="bodyLarge">E-mail: {item.email}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormFuncionario", {
                    acao: editarFuncionario,
                    funcionario: item,
                  })
                }
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setFuncionarioASerExcluido(item);
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
          navigation.push("FormFuncionario", { acao: adicionarFuncionario })
        }
      />

      {/* Modal Excluir Funcionário */}
      <Portal>
        <Dialog visible={showModalExcluirFuncionario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza que deseja excluir este funcionário?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirFuncionario}>Tenho Certeza</Button>
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
