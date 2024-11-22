import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ScrollView } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/",
});

export default function Consumption({ navigation }) {
  const [consumoData, setConsumoData] = useState([]);

  useEffect(() => {
    const fetchConsumo = async () => {
      try {
        const response = await api.get('/Consumption.json');
        const data = response.data;
        if (data) {
          const consumoList = Array.isArray(data)
            ? data.filter((item) => item !== null)
            : Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }));
          setConsumoData(consumoList);
        } else {
          setConsumoData([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de consumo:", error);
      }
    };

    fetchConsumo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Residência: {item.residencia || 'N/A'}</Text>
      <Text style={styles.itemText}>Consumo Atual: {item.consumo || 0} kWh</Text>
      <Text style={styles.itemText}>
        Última Atualização: {item.ultimaAtualizacao || 'Sem informações'}
      </Text>
    </View>
  );

  const chartData = {
    labels: consumoData.map((item) => item.residencia || 'N/A'),
    datasets: [
      {
        data: consumoData.map((item) => (item.consumo ? item.consumo : 0)),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} />
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <Text style={styles.title}>Monitoramento de Consumo</Text>
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#2A7048',
              backgroundGradientFrom: '#1E5631',
              backgroundGradientTo: '#A4DE02',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
          <FlatList
            data={consumoData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
          />
        </View>
        <Footer />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A7048',
    marginVertical: 20,
  },
  list: {
    marginTop: 10,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B9C7C5',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20515E',
  },
  itemText: {
    fontSize: 14,
    color: '#505050',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 8,
  },
});
