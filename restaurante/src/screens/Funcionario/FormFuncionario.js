import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormFuncionario({ navigation, route }) {
  const { acao, funcionario: funcionarioAntigo } = route.params;

  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [salario, setSalario] = useState("");
  const [endereco, setEndereco] = useState("");

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório!"),
    sobrenome: Yup.string().required("Campo obrigatório!"),
    cpf: Yup.string()
      .min(11, "CPF deve conter 11 digitos")
      .required("Campo obrigatório!"),
    endereco: Yup.string().required("Campo obrigatório!"),
    salario: Yup.string().required("Campo obrigatório!"),
    telefone: Yup.string().required("Campo obrigatório!"),
    cep: Yup.string().required("Campo obrigatório!"),
    email: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("funcionario -> ", funcionarioAntigo);

    if (funcionarioAntigo) {
      setNome(funcionarioAntigo.nome);
      setCpf(funcionarioAntigo.cpf);
      setTelefone(funcionarioAntigo.telefone);
      setCep(funcionarioAntigo.cep);
      setEmail(funcionarioAntigo.email);
      setSobrenome(funcionarioAntigo.sobrenome);
      setEndereco(funcionarioAntigo.endereco);
      setSalario(funcionarioAntigo.salario);
    }
  }, []);

  function salvar(novoFuncionario) {
    console.log("SALVAR DADOS NOVO FUNCIONÁRIO -> ", novoFuncionario);

    if (funcionarioAntigo) {
      acao(funcionarioAntigo, novoFuncionario);
    } else {
      acao(novoFuncionario);
    }

    Toast.show({
      type: "success",
      text1: "Funcionário salvo com sucesso!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {funcionarioAntigo ? "Editar Funcionário" : "Adicionar Funcionário"}
      </Text>

      <Formik
        initialValues={{
          nome: "",
          sobrenome: "",
          cpf: "",
          telefone: "",
          cep: "",
          email: "",
          endereco: "",
          salario: "",
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
                label="Nome"
                value={values.nome}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
              />
              {touched.nome && errors.nome && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.nome}
                </Text>
              )}
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Sobrenome"
                value={values.sobrenome}
                onChangeText={handleChange("sobrenome")}
                onBlur={handleBlur("sobrenome")}
              />
              {touched.sobrenome && errors.sobrenome && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.sobrenome}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="CPF"
                placeholder="999.999.999-99"
                keyboardType="numeric"
                value={values.cpf}
                onChangeText={handleChange("cpf")}
                onBlur={handleBlur("cpf")}
                error={touched.cpf && errors.cpf ? true : false}
                render={(props) => <TextInputMask {...props} type={"cpf"} />}
              />
              {touched.cpf && errors.cpf && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.cpf}
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

              <TextInput
                style={styles.input}
                mode="outlined"
                label="CEP"
                placeholder="99999-9999"
                keyboardType="numeric"
                value={values.cep}
                onChangeText={handleChange("cep")}
                onBlur={handleBlur("cep")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"custom"}
                    options={{
                      mask: "99999-999",
                    }}
                  />
                )}
              />
              {touched.cep && errors.cep && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.cep}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="E-mail"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                />
              {touched.email && errors.email && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Endereço"
                value={values.endereco}
                onChangeText={handleChange("endereco")}
                onBlur={handleBlur("endereco")}
                />
              {touched.endereco && errors.endereco && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.endereco}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Salário"
                value={values.salario}
                onChangeText={handleChange("salario")}
                onBlur={handleBlur("salario")}
                />
              {touched.salario && errors.salario && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.salario}
                </Text>
              )}
              <View><Text></Text></View>

            </View>

            <View style={styles.buttonContainer}>
            <Button
                style={[styles.button, { backgroundColor: '#808080' }]}
                mode="contained"
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button
                style={[styles.button, { backgroundColor: '#008000' }]}
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
