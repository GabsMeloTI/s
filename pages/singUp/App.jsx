import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/",
});

export default function SignUp({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
  });
  const [confirmacao, setConfirmacao] = useState("");

  const handleChange = (name, value) => {
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleConfirmacao = (value) => {
    setConfirmacao(value);
  };

  const handleSignUp = async () => {
    if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.cpf) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (usuario.senha !== confirmacao) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }

    try {
      const response = await api.post("/usuarios.json", usuario);
      if (response.status === 200) {
        Alert.alert(
          "Cadastro Realizado",
          `Bem-vindo(a), ${usuario.nome}!`,
          [{ text: "OK", onPress: () => navigation.navigate('Home') }]
        );
      } else {
        Alert.alert("Erro", "Erro ao cadastrar o usuário. Tente novamente.");
      }
    } catch (error) {
      Alert.alert("Erro", `Erro ao conectar ao servidor: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} />

      <View style={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.titulo}>CADASTRAR</Text>
          <Text style={styles.subtitulo}>
            Já possui conta?
            <Text style={styles.span} onPress={() => navigation.navigate('SignIn')}> Entre agora</Text>.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Bem-vindo(a)!</Text>
          <Text style={styles.formSubtitle}>
            Preencha os campos abaixo para criar sua conta e começar a utilizar nossos serviços.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              value={usuario.nome}
              onChangeText={(text) => handleChange("nome", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              value={usuario.cpf}
              keyboardType="numeric"
              onChangeText={(text) => handleChange("cpf", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={usuario.email}
              keyboardType="email-address"
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              value={usuario.senha}
              onChangeText={(text) => handleChange("senha", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirme sua senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              secureTextEntry={true}
              value={confirmacao}
              onChangeText={(text) => handleConfirmacao(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  conteudo: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#20515E',
  },
  subtitulo: {
    fontSize: 14,
    color: '#556B2F',
    textAlign: 'center',
    marginTop: 10,
  },
  span: {
    color: '#2A7048',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20515E',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#797777',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#556B2F',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#B9C7C5',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: '#505050',
  },
  button: {
    backgroundColor: '#2A7048',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
