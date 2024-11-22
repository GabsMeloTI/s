import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const instagram = require('../../assets/instagram.png');
const facebook = require('../../assets/facebook.png');
const twitter = require('../../assets/twitterX.png');
const rodape = require('../../assets/linha-rodape.png');

export default function Footer() {
  return (
    <View style={styles.rodape}>
    

      <View style={styles.conteudoRodape}>
        <View style={styles.textContainer}>
          <Text style={styles.textRodape}>
            Promovendo acesso à energia renovável e sustentável, nossa missão é melhorar a qualidade de vida em comunidades remotas. 
            A energia limpa é o futuro, e juntos podemos fazer a diferença.
          </Text>
        </View>
        <View style={styles.socialMediaContainer}>
          <Text style={styles.textRedes}>Conecte-se conosco:</Text>
          <View style={styles.imageRedes}>
            <Image source={facebook} style={styles.imgRodape} />
            <Text style={styles.textRedes}>Solutech Energy</Text>
          </View>
          <View style={styles.imageRedes}>
            <Image source={instagram} style={styles.imgRodape} />
            <Text style={styles.textRedes}>@SolutechEnergy</Text>
          </View>
          <View style={styles.imageRedes}>
            <Image source={twitter} style={styles.imgRodape} />
            <Text style={styles.textRedes}>@Solutech_Renewable</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#F4F4F9',
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#B9C7C5',
  },
  conteudoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textContainer: {
    width: '60%',
  },
  textRodape: {
    fontSize: 14,
    color: '#20515E',
    textAlign: 'left',
  },
  socialMediaContainer: {
    alignItems: 'flex-start',
  },
  textRedes: {
    fontSize: 12,
    color: '#20515E',
    marginBottom: 8,
  },
  imageRedes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  linhaRodape: {
    height: 2,
    width: '100%',
    backgroundColor: '#B9C7C5',
    marginBottom: 15,
  },
  imgRodape: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
