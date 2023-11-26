import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormReserva({ navigation, route }) {
  const { acao, reserva: reservaAntiga } = route.params;

  const [data, setData] = useState();
  const [horario, setHorario] = useState("");
  const [turno, setTurno] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pessoa, setPessoa] = useState("");

  const validationSchema = Yup.object().shape({
    data: Yup.string().required("Campo obrigatório!"),
    horario: Yup.string().required("Campo obrigatório!"),
    turno: Yup.string().required("Campo obrigatório!"),
    telefone: Yup.string().required("Campo obrigatório!"),
    pessoa: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("reserva -> ", reservaAntiga);

    if (reservaAntiga) {
      setData(reservaAntiga.data);
      setTurno(reservaAntiga.turno);
      setTelefone(reservaAntiga.telefone);
      setPessoa(reservaAntiga.pessoa);
      setHorario(reservaAntiga.horario);
    }
  }, []);

  function salvar(novaReserva) {
    console.log("SALVAR DADOS NOVA RESERVA -> ", novaReserva);

    if (reservaAntiga) {
      acao(reservaAntiga, novaReserva);
    } else {
      acao(novaReserva);
    }

    Toast.show({
      type: "success",
      text1: "Reserva salva com sucesso!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {reservaAntiga ? "Editar Reserva" : "Adicionar Reserva"}
      </Text>

      <Formik
        initialValues={{
          data: "",
          horario: "",
          turno: "",
          telefone: "",
          pessoa: "",
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
                label="Data da Reserva"
                keyboardType="numeric"
                value={values.data}
                onChangeText={handleChange("data")}
                onBlur={handleBlur("data")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"custom"}
                    options={{
                      mask: "99/99/9999",
                    }}
                  />
                )}
              />
              {touched.data && errors.data && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.data}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Horário"
                keyboardType="numeric"
                value={values.horario}
                onChangeText={handleChange("horario")}
                onBlur={handleBlur("horario")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"custom"}
                    options={{
                      mask: "99:99",
                    }}
                  />
                )}
              />
              {touched.horario && errors.horario && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.horario}
                </Text>
              )}
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Turno"
                value={values.turno}
                onChangeText={handleChange("turno")}
                onBlur={handleBlur("turno")}
                error={touched.turno && errors.turno ? true : false}
              />
              {touched.turno && errors.turno && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.turno}
                </Text>
              )}
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Pessoa"
                value={values.pessoa}
                onChangeText={handleChange("pessoa")}
                onBlur={handleBlur("pessoa")}
                error={touched.pessoa && errors.pessoa ? true : false}
              />
              {touched.pessoa && errors.pessoa && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.pessoa}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Telefone"
                placeholder="(99) 99999-9999"
                keyboardType="numeric"
                value={values.telefone}
                onChangeText={handleChange("telefone")}
                onBlur={handleBlur("telefone")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                  />
                )}
              />
              {touched.telefone && errors.telefone && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.telefone}
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
