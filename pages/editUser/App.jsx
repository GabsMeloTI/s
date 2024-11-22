import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import { UserContext } from '../../components/dataUser/App'; 

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function EditUser({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleSave = async () => {
    try {
      const response = await api.get('/usuarios.json');
      const data = response.data;

      let userKey = null;

      for (const key in data) {
        if (data[key].email === user.email) {
          userKey = key;
          break;
        }
      }

      if (!userKey) {
        Alert.alert("Erro", "Usuário não encontrado.");
        return;
      }

      await api.patch(`/usuarios/${userKey}.json`, updatedUser);
      setUser(updatedUser); 
      Alert.alert("Sucesso", "Seus dados foram atualizados com sucesso!");
      setEditable(false);
    } catch (error) {
      Alert.alert("Erro", `Erro ao atualizar os dados: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} />

      <View style={styles.conteudo}>
        <View style={styles.conteudoInput}>
          <View style={styles.conteudoTitle}>
            <Text style={styles.titleInput}>DADOS PESSOAIS</Text>
            <Text style={styles.desInput}>
              Aqui, você pode visualizar e editar suas informações pessoais.
            </Text>
          </View>

          <View>
            <View>
              <Text style={styles.desInput}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={updatedUser.nome}
                editable={editable}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, nome: text })}
              />
            </View>
            <View>
              <Text style={styles.desInput}>CPF:</Text>
              <TextInput
                style={styles.input}
                value={updatedUser.cpf}
                editable={editable}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, cpf: text })}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Email:</Text>
              <TextInput
                style={styles.input}
                value={updatedUser.email}
                editable={editable}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, email: text })}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Senha:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={updatedUser.senha}
                editable={editable}
                onChangeText={(text) => setUpdatedUser({ ...updatedUser, senha: text })}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => (editable ? handleSave() : setEditable(true))}
          >
            <Text style={styles.textoBotao}>
              {editable ? "Salvar Alterações" : "Editar Dados"}
            </Text>
          </TouchableOpacity>

          {editable && (
            <TouchableOpacity
              style={[styles.botao, styles.cancelButton]}
              onPress={() => {
                setUpdatedUser({ ...user });
                setEditable(false);
              }}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          )}
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
  titleInput: {
    fontSize: 18,
    color: '#2A7048',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  desInput: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 8,
    textAlign: 'center',
  },
  conteudoInput: {
    paddingHorizontal: '5%',
    paddingVertical: '10%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginTop: 20,
    backgroundColor: '#2A7048',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#B9C7C5',
    marginTop: 10,
  },
});
