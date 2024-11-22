import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../dataUser/App'; 

const logo = require('../../assets/logo.png');

export default function Menu({ navigation }) {
  const { user } = useContext(UserContext); 

  return (
    <View style={styles.menu}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.lista}>
        <Text style={styles.topicos} onPress={() => { navigation.navigate('Home'); }}>Home</Text>
        <Text style={styles.topicos} onPress={() => { navigation.navigate('Consumption'); }}>Consumo</Text>
        <Text style={styles.topicos} onPress={() => { navigation.navigate('Production'); }}>Produção</Text>
        <Text style={styles.topicos} onPress={() => { navigation.navigate('HousingUnits'); }}>Habitações</Text>
        <Text
          style={styles.topicos}
          onPress={() => { 
            user ? navigation.navigate('EditUser') : navigation.navigate('SingIn'); 
          }}
        >
          {user ? user.nome : 'Entrar'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  lista: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '85%',
    marginTop: -20,
  },
  topicos: {
    color: '#20515E',
    fontWeight: 'bold',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 40,
  },
});
