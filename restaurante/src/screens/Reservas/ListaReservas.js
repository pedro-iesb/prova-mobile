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

export default function ListaReservas({ navigation, route }) {
  const [reservas, setReservas] = useState([]);
  const [showModalExcluirReserva, setShowModalExcluirReserva] = useState(false);
  const [reservaASerExcluida, setReservaASerExcluida] = useState(null);

  useEffect(() => {
    loadReservas();
  }, []);

  async function loadReservas() {
    const response = await AsyncStorage.getItem("reservas");
    console.log(
      "🚀 ~ file: ListaReservasAsyncStorage.js:21 ~ loadReservas ~ response:",
      response
    );
    const reservasStorage = response ? JSON.parse(response) : [];
    setReservas(reservasStorage);
  }

  const showModal = () => setShowModalExcluirReserva(true);

  const hideModal = () => setShowModalExcluirReserva(false);

  async function adicionarReserva(reserva) {
    let novaListaReservas = reservas;
    novaListaReservas.push(reserva);
    await AsyncStorage.setItem("reservas", JSON.stringify(novaListaReservas));
    setReservas(novaListaReservas);
  }

  async function editarReserva(reservaAntiga, novosDados) {
    console.log("RESERVA ANTIGA -> ", reservaAntiga);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaReservas = reservas.map((reserva) => {
      if (reserva == reservaAntiga) {
        return novosDados;
      } else {
        return reserva;
      }
    });

    await AsyncStorage.setItem("reservas", JSON.stringify(novaListaReservas));
    setReservas(novaListaReservas);
  }

  async function excluirReserva(reserva) {
    const novaListaReservas = reservas.filter((p) => p !== reserva);
    await AsyncStorage.setItem("reservas", JSON.stringify(novaListaReservas));
    setReservas(novaListaReservas);
    Toast.show({
      type: "success",
      text1: "Reserva excluída com sucesso!",
    });
  }

  function handleExluirReserva() {
    excluirReserva(reservaASerExcluida);
    setReservaASerExcluida(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Reservas
      </Text>

      <FlatList
        style={styles.list}
        data={reservas}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Data: {item?.data}</Text>
                <Text variant="titleMedium">Turno: {item?.turno}</Text>
                <Text variant="bodyLarge">Horário: {item?.horario}</Text>
                <Text variant="bodyLarge">Pessoa: {item?.pessoa}</Text>
                <Text variant="bodyLarge">Telefone: {item.telefone}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormReserva", {
                    acao: editarReserva,
                    reserva: item,
                  })
                }
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setReservaASerExcluida(item);
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
          navigation.push("FormReserva", { acao: adicionarReserva })
        }
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirReserva} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza que deseja excluir esta reserva?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirReserva}>Tenho Certeza</Button>
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
