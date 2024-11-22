import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, StatusBar } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/",
});

export default function Production({ navigation }) {
  const [producaoData, setProducaoData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchProducao = async () => {
      try {
        const response = await api.get('/"Production".json');
        const data = response.data;
        const producaoList = [];
        const chartValues = [];
        for (const key in data) {
          producaoList.push({ id: key, ...data[key] });
          chartValues.push(data[key].producao);
        }
        setProducaoData(producaoList);
        setChartData(chartValues);
      } catch (error) {
        console.error("Erro ao buscar dados de produção:", error);
      }
    };

    fetchProducao();
  }, []);

  const renderItems = () =>
    producaoData.map((item) => (
      <View key={item.id} style={styles.item}>
        <Text style={styles.itemTitle}>Fonte: {item.fonte}</Text>
        <Text style={styles.itemText}>Produção Atual: {item.producao} kWh</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>
      </View>
    ));

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Monitoramento de Produção</Text>
          <BarChart
            data={{
              labels: producaoData.map((item) => item.fonte),
              datasets: [{ data: chartData }],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#e8f5e9",
              backgroundGradientTo: "#a5d6a7",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
          {renderItems()}
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A7048',
    marginVertical: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
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
});
