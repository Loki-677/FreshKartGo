import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams();
  
  const products: Product[] = React.useMemo(() => [
    // Fruits
    { id: '1', name: 'Fresh Apples', price: 4.99, image: 'apple.fill', category: 'fruits', description: 'Sweet and crispy apples' },
    { id: '2', name: 'Organic Bananas', price: 3.99, image: 'banana.fill', category: 'fruits', description: 'Ripe organic bananas' },
    { id: '3', name: 'Mixed Berries', price: 6.99, image: 'leaf.fill', category: 'fruits', description: 'Assorted fresh berries' },
    { id: '4', name: 'Fresh Oranges', price: 5.99, image: 'orange.fill', category: 'fruits', description: 'Juicy oranges' },
    // Add more products for other categories...
  ], []);

  const categoryProducts = products.filter(product => product.category === id);

  const renderProduct = ({ item }: { item: Product }) => (
    <ThemedView style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <IconSymbol name={item.image} size={40} color="#808080" />
      </View>
      <ThemedText style={styles.productName}>{item.name}</ThemedText>
      <ThemedText style={styles.productDescription}>{item.description}</ThemedText>
      <ThemedText style={styles.productPrice}>${item.price.toFixed(2)}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>{name}</ThemedText>
      <FlatList
        data={categoryProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productGrid: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    maxWidth: '50%',
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
    color: '#666666',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C6A052',
  },
});