import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function DetailsScreen({ route, navigation }) {
  const productId = route?.params?.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProduct(response.data);
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

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.categoryTag}>{(product.category || '').toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(product.discountPercentage)}% OFF</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Descrição do Produto</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
          <Text style={styles.buyButtonText}>Comprar Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#64748B' },
  image: { width: '100%', height: 300, backgroundColor: '#F1F5F9' },
  infoContainer: { padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, backgroundColor: '#FFFFFF' },
  categoryTag: { fontSize: 12, fontWeight: '700', color: '#2563EB', letterSpacing: 1, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  price: { fontSize: 24, fontWeight: '800', color: '#16A34A', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  description: { fontSize: 15, color: '#64748B', lineHeight: 22, marginBottom: 24 },
  buyButton: { backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  discountBadge: { backgroundColor: '#DC2626', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginLeft: 12 },
  discountText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
});