import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function HousingUnits({ navigation }) {
  const [unidades, setUnidades] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUnidade, setCurrentUnidade] = useState(null);
  const [novaUnidade, setNovaUnidade] = useState({
    nome: "",
    endereco: "",
    consumo: "",
  });

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const response = await api.get('/unidades.json');
        const data = response.data;

        const unidadesList = [];
        for (const key in data) {
          unidadesList.push({ id: key, ...data[key] });
        }

        setUnidades(unidadesList);
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
      }
    };

    fetchUnidades();
  }, []);

  const handleAddUnidade = async () => {
    if (!novaUnidade.nome || !novaUnidade.endereco || !novaUnidade.consumo) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/unidades.json', novaUnidade);
      setUnidades([...unidades, { id: response.data.name, ...novaUnidade }]);
      setNovaUnidade({ nome: "", endereco: "", consumo: "" });
      setModalVisible(false);
      Alert.alert("Sucesso", "Unidade adicionada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", `Erro ao adicionar unidade: ${error.message}`);
    }
  };

  const handleEditUnidade = async () => {
    if (!currentUnidade.nome || !currentUnidade.endereco || !currentUnidade.consumo) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await api.patch(`/unidades/${currentUnidade.id}.json`, currentUnidade);
      setUnidades((prev) =>
        prev.map((u) => (u.id === currentUnidade.id ? currentUnidade : u))
      );
      setCurrentUnidade(null);
      Alert.alert("Sucesso", "Unidade atualizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", `Erro ao atualizar unidade: ${error.message}`);
    }
  };

  const handleDeleteUnidade = async (id) => {
    try {
      await api.delete(`/unidades/${id}.json`);
      setUnidades((prev) => prev.filter((u) => u.id !== id));
      Alert.alert("Sucesso", "Unidade excluída com sucesso!");
    } catch (error) {
      Alert.alert("Erro", `Erro ao excluir unidade: ${error.message}`);
    }
  };

  const renderUnidade = ({ item }) => (
    <View style={styles.unidade}>
      <Text style={styles.unidadeNome}>{item.nome}</Text>
      <Text style={styles.unidadeInfo}>Endereço: {item.endereco}</Text>
      <Text style={styles.unidadeInfo}>Consumo: {item.consumo} kWh</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoEditar]}
          onPress={() => {
            setCurrentUnidade(item);
          }}
        >
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, styles.botaoExcluir]}
          onPress={() => handleDeleteUnidade(item.id)}
        >
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Unidade</Text>
      </TouchableOpacity>

      <FlatList
        data={unidades}
        renderItem={renderUnidade}
        keyExtractor={(item) => item.id}
        style={styles.lista}
      />

      {/* Modal para adicionar ou editar unidade */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible || !!currentUnidade}
        onRequestClose={() => {
          setModalVisible(false);
          setCurrentUnidade(null);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitulo}>
            {currentUnidade ? "Editar Unidade" : "Nova Unidade"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={currentUnidade ? currentUnidade.nome : novaUnidade.nome}
            onChangeText={(text) =>
              currentUnidade
                ? setCurrentUnidade({ ...currentUnidade, nome: text })
                : setNovaUnidade({ ...novaUnidade, nome: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={currentUnidade ? currentUnidade.endereco : novaUnidade.endereco}
            onChangeText={(text) =>
              currentUnidade
                ? setCurrentUnidade({ ...currentUnidade, endereco: text })
                : setNovaUnidade({ ...novaUnidade, endereco: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Consumo (kWh)"
            keyboardType="numeric"
            value={currentUnidade ? currentUnidade.consumo : novaUnidade.consumo}
            onChangeText={(text) =>
              currentUnidade
                ? setCurrentUnidade({ ...currentUnidade, consumo: text })
                : setNovaUnidade({ ...novaUnidade, consumo: text })
            }
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={currentUnidade ? handleEditUnidade : handleAddUnidade}
          >
            <Text style={styles.botaoTexto}>
              {currentUnidade ? "Salvar Alterações" : "Adicionar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoCancelar]}
            onPress={() => {
              setModalVisible(false);
              setCurrentUnidade(null);
            }}
          >
            <Text style={styles.botaoTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
    padding: 20,
  },
  addButton: {
    backgroundColor: '#2A7048',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    marginTop: 10,
  },
  unidade: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unidadeNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2A7048',
  },
  unidadeInfo: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botao: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  botaoEditar: {
    backgroundColor: '#FFA500',
  },
  botaoExcluir: {
    backgroundColor: '#FF6347',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    backgroundColor: '#B9C7C5',
    marginTop: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#B9C7C5',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: '80%',
    fontSize: 14,
    color: '#505050',
  },
});
