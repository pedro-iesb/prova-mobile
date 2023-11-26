import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormAvaliacao({ navigation, route }) {
  const { acao, avaliacao: avaliacaoAntiga } = route.params;

  const [cardapio, setCardapio] = useState();
  const [atendimento, setAtendimento] = useState("");
  const [preparo, setPreparo] = useState("");
  const [reservas, setReservas] = useState("");

  const validationSchema = Yup.object().shape({
    cardapio: Yup.string().required("Campo obrigatório!"),
    atendimento: Yup.string().required("Campo obrigatório!"),
    preparo: Yup.string().required("Campo obrigatório!"),
    reservas: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("avaliacao -> ", avaliacaoAntiga);

    if (avaliacaoAntiga) {
      setCardapio(avaliacaoAntiga.cardapio);
      setPreparo(avaliacaoAntiga.preparo);
      setReservas(avaliacaoAntiga.reservas);
      setAtendimento(avaliacaoAntiga.atendimento);
    }
  }, []);

  function salvar(novaAvaliacao) {
    console.log("SALVAR DADOS NOVA AVALIACAO -> ", novaAvaliacao);

    if (avaliacaoAntiga) {
      acao(avaliacaoAntiga, novaAvaliacao);
    } else {
      acao(novaAvaliacao);
    }

    Toast.show({
      type: "success",
      text1: "Avaliacao salva com sucesso!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {avaliacaoAntiga ? "Editar Avaliacao" : "Adicionar Avaliacao"}
      </Text>

      <Formik
        initialValues={{
          cardapio: "",
          atendimento: "",
          preparo: "",
          reservas: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          values,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Cardápio"
                keyboardType="numeric"
                value={values.cardapio}
                onChangeText={handleChange("cardapio")}
                onBlur={handleBlur("cardapio")}
              />
              {touched.cardapio && errors.cardapio && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.cardapio}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Atendimento"
                keyboardType="numeric"
                value={values.atendimento}
                onChangeText={handleChange("atendimento")}
                onBlur={handleBlur("atendimento")}
              />
              {touched.atendimento && errors.atendimento && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.atendimento}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Preparo"
                keyboardType="numeric"
                value={values.preparo}
                onChangeText={handleChange("preparo")}
                onBlur={handleBlur("preparo")}
                error={touched.preparo && errors.preparo ? true : false}
              />
              {touched.preparo && errors.preparo && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.preparo}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Reservas"
                keyboardType="numeric"
                value={values.reservas}
                onChangeText={handleChange("reservas")}
                onBlur={handleBlur("reservas")}
              />
              {touched.reservas && errors.reservas && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.reservas}
                </Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                style={[styles.button, { backgroundColor: "#808080" }]}
                mode="contained"
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button
                style={[styles.button, { backgroundColor: "#008000" }]}
                mode="contained"
                onPress={handleSubmit}
              >
                Salvar
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5E6CA",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: "40%",
    alignSelf: "center",
  },
});
