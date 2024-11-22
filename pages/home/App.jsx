import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';

const formatDate = (date) => {
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${dayOfWeek}, ${day} de ${month}`;
};

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} />
      
      <View style={styles.conteudo}>
        <Image
          source={{ uri: 'https://www.dcml.com.br/wp-content/uploads/2019/10/energias-alternativas.jpg' }}
          style={styles.bannerImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Gerenciamento de Energia Renovável</Text>
          <Text style={styles.data}>{formatDate(new Date())}</Text>
          <Text style={styles.subtitulo}>
            Este projeto busca facilitar o acesso à energia sustentável para comunidades remotas. Por meio do monitoramento e da distribuição de fontes eólica e solar, otimizamos o uso de recursos renováveis, promovendo eficiência energética e justiça social.
          </Text>
          <Text style={styles.subtitulo}>
            Nosso objetivo é tornar a energia renovável acessível, fornecendo ferramentas para monitorar a produção, o consumo e a distribuição em tempo real.
          </Text>
        </View>
      </View>

      <Footer />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTittle}>ENERGIA LIMPA PARA TODOS</Text>
            <Text style={styles.modalText}>
              Acompanhe o consumo, otimize a produção e garanta acesso justo à energia limpa.
            </Text>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
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
  },
  conteudo: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2A7048',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#556B2F',
    textAlign: 'justify',
    marginBottom: 10,
  },
  data: {
    fontSize: 14,
    color: '#797777',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E4F1F5",
    paddingHorizontal: 35,
    paddingVertical: 25,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTittle: {
    color: '#20515E',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    color: '#505050',
    fontSize: 14,
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: "#20515E",
    borderRadius: 5,
    width: 180,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
});
