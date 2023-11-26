import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormCardapio({ navigation, route }) {
  const { acao, cardapio: cardapioAntigo } = route.params;

  const [entrada, setEntrada] = useState();
  const [principal, setPrincipal] = useState("");
  const [sobremesa, setSobremesa] = useState("");
  const [bebidas, setBebidas] = useState("");

  const validationSchema = Yup.object().shape({
    entrada: Yup.string().required("Campo obrigatório!"),
    principal: Yup.string().required("Campo obrigatório!"),
    sobremesa: Yup.string().required("Campo obrigatório!"),
    bebidas: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("cardapio -> ", cardapioAntigo);

    if (cardapioAntigo) {
      setEntrada(cardapioAntigo.entrada);
      setSobremesa(cardapioAntigo.sobremesa);
      setBebidas(cardapioAntigo.bebidas);
      setPrincipal(cardapioAntigo.principal);
    }
  }, []);

  function salvar(novoCardapio) {
    console.log("SALVAR DADOS NOVO CARDAPIO -> ", novoCardapio);

    if (cardapioAntigo) {
      acao(cardapioAntigo, novoCardapio);
    } else {
      acao(novoCardapio);
    }

    Toast.show({
      type: "success",
      text1: "Cardápio salva com sucesso!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {cardapioAntigo ? "Editar Cardápio" : "Adicionar Cardápio"}
      </Text>

      <Formik
        initialValues={{
          entrada: "",
          principal: "",
          sobremesa: "",
          bebidas: "",
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
                label="Entrada"
                value={values.entrada}
                onChangeText={handleChange("entrada")}
                onBlur={handleBlur("entrada")}
               />
              {touched.entrada && errors.entrada && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.entrada}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Principal"
                value={values.principal}
                onChangeText={handleChange("principal")}
                onBlur={handleBlur("principal")}
                  />
              {touched.principal && errors.principal && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.principal}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Sobremesa"
                value={values.sobremesa}
                onChangeText={handleChange("sobremesa")}
                onBlur={handleBlur("sobremesa")}
                error={touched.sobremesa && errors.sobremesa ? true : false}
              />
              {touched.sobremesa && errors.sobremesa && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.sobremesa}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Bebidas"
                value={values.bebidas}
                onChangeText={handleChange("bebidas")}
                onBlur={handleBlur("bebidas")}
                />
              {touched.bebidas && errors.bebidas && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.bebidas}
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
