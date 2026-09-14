import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import axios from 'axios';

export default function ProductsScreen({ route, navigation }) {
  // Solução definitiva: Define a categoria baseado no nome exato da Aba!
  const isFeminino = route.name === 'Feminino';
  const category = isFeminino ? 'womens-dresses' : 'mens-shirts';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Puxa exatamente a categoria masculina ou feminina
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return 'R$ 0,00';
    return `R$ ${(price * 5).toFixed(2).replace('.', ',')}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', { productId: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.title} numberOfLines={2}>{item?.title || 'Produto'}</Text>
        <Text style={styles.brand}>{item?.brand || 'Marca Exclusiva'}</Text>
        <Text style={styles.price}>{formatPrice(item?.price)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Catálogo Exclusivo</Text>
          <Text style={styles.headerTitle}>{isFeminino ? 'Coleção Feminina' : 'Coleção Masculina'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logout())}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Carregando {isFeminino ? 'vestidos' : 'camisas'}...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => (item?.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerSubtitle: { fontSize: 12, color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  logoutButton: { backgroundColor: '#FEE2E2', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  logoutText: { color: '#EF4444', fontWeight: '600', fontSize: 14 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#64748B', fontSize: 14 },
  listContainer: { padding: 16 },
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  image: { width: 85, height: 85, borderRadius: 12, backgroundColor: '#F1F5F9' },
  cardInfo: { flex: 1, marginLeft: 14 },
  title: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  brand: { fontSize: 12, color: '#94A3B8', marginBottom: 8 },
  price: { fontSize: 17, fontWeight: '700', color: '#2563EB' }
});