import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import { UserContext } from '../../components/dataUser/App'; 

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setUser } = useContext(UserContext); 

  const login = async () => {
    try {
      const response = await api.get('/usuarios.json');
      const data = response.data;

      let userFound = false;

      for (const key in data) {
        if (data[key].email === email && data[key].senha === senha) {
          userFound = true;
          setUser(data[key]); 
          alert(`Login bem-sucedido! Bem-vindo, ${data[key].nome}!`);
          navigation.navigate('Home');
          break;
        }
      }

      if (!userFound) {
        alert("Erro de login. Usuário não encontrado ou credenciais incorretas.");
      }
    } catch (error) {
      alert(`Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation}/>

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>ENTRAR</Text>
          <Text style={styles.subtitulo}>Ainda não tem conta em nossa plataforma?</Text>
          <Text style={styles.subtitulo}>
            Não perca tempo e
            <Text style={styles.span} onPress={() => navigation.navigate('SingUp')}> cadastre-se </Text>
            para começar a monitorar e otimizar seu consumo de energia renovável.
          </Text>
        </View>

        <View style={styles.conteudoInput}>
          <View style={styles.conteudoTitle}>
            <Text style={styles.titleInput}>BEM-VINDO AO GERENCIADOR DE ENERGIA</Text>
            <Text style={styles.desInput}>
              Aqui, você pode gerenciar e monitorar o consumo e a produção de energia sustentável
              em sua comunidade. Promovendo um futuro mais limpo e independente!
            </Text>
          </View>
          <View>
            <View>
              <Text style={styles.desInput}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
            </View>
            <TouchableOpacity style={styles.botao} onPress={login}>
              <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Footer />
      </View>

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
    alignItems: 'center',
  },
  conteudoTitle: {
    alignItems: 'center',
    marginBottom: '5%',
    width: 350,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2A7048',
  },
  subtitulo: {
    fontSize: 14,
    color: '#797777',
    textAlign: 'center',
  },
  span: {
    color: '#2A7048',
    fontWeight: 'bold',
  },
  conteudoInput: {
    paddingHorizontal: '3%',
    paddingVertical: '10%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  desInput: {
    fontSize: 14,
    color: '#505050',
    marginBottom: '2%',
  },
  titleInput: {
    fontSize: 18,
    color: '#2A7048',
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',
  },
  input: {
    height: 48,
    width: 280,
    borderColor: '#B9C7C5',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#F4F4F9',
    color: '#505050',
  },
  botao: {
    marginTop: '5%',
    backgroundColor: '#2A7048',
    paddingHorizontal: '15%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
