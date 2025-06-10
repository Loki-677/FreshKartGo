import { StyleSheet, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  category: string;
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const welcomeHeader = (
    <View style={styles.parallaxBackground}>
      <ThemedText style={styles.welcomeText}>Welcome to FreshKartGo</ThemedText>
      <ThemedText style={styles.welcomeSubtext}>Fresh groceries delivered to your door</ThemedText>
    </View>
  );

  const categories: Category[] = [
    { id: 'all', name: 'All', icon: 'square.grid.2x2.fill' },
    { id: 'fruits', name: 'Fruits', icon: 'leaf.fill' },
    { id: 'vegetables', name: 'Vegetables', icon: 'carrot.fill' },
    { id: 'dairy', name: 'Dairy', icon: 'cup.and.saucer.fill' },
    { id: 'bakery', name: 'Bakery', icon: 'birthday.cake.fill' },
    { id: 'beverages', name: 'Beverages', icon: 'mug.fill' },
    { id: 'snacks', name: 'Snacks', icon: 'popcorn.fill' },
    { id: 'meat', name: 'Meat', icon: 'flame.fill' },
    { id: 'seafood', name: 'Seafood', icon: 'water.waves' },
    { id: 'frozen', name: 'Frozen', icon: 'snowflake' },
    { id: 'pantry', name: 'Pantry', icon: 'cart.fill' }
  ];

  const allProducts: Product[] = [
    { id: '1', name: 'Fresh Apples', price: 4.99, image: 'apple.fill', category: 'fruits' },
    { id: '2', name: 'Organic Bananas', price: 3.99, image: 'banana.fill', category: 'fruits' },
    { id: '3', name: 'Fresh Carrots', price: 2.99, image: 'carrot.fill', category: 'vegetables' },
    { id: '4', name: 'Organic Milk', price: 5.99, image: 'cup.and.saucer.fill', category: 'dairy' },
    { id: '5', name: 'Whole Wheat Bread', price: 3.49, image: 'birthday.cake.fill', category: 'bakery' },
    { id: '6', name: 'Fresh Orange Juice', price: 4.49, image: 'mug.fill', category: 'beverages' },
    { id: '7', name: 'Greek Yogurt', price: 2.99, image: 'cup.and.saucer.fill', category: 'dairy' },
    { id: '8', name: 'Mixed Berries', price: 6.99, image: 'leaf.fill', category: 'fruits' },
    { id: '9', name: 'Chicken Breast', price: 8.99, image: 'flame.fill', category: 'meat' },
    { id: '10', name: 'Fresh Salmon', price: 12.99, image: 'water.waves', category: 'seafood' },
    { id: '11', name: 'Ice Cream', price: 5.99, image: 'snowflake', category: 'frozen' },
    { id: '12', name: 'Pasta', price: 2.49, image: 'cart.fill', category: 'pantry' }
  ];

  const specialOffers: Product[] = [
    { id: '1', name: 'Premium Milk', price: 5.99, discount: 20, image: 'cup.and.saucer.fill', category: 'dairy' },
    { id: '2', name: 'Whole Grain Bread', price: 4.99, discount: 15, image: 'birthday.cake.fill', category: 'bakery' },
    { id: '3', name: 'Fresh Orange Juice', price: 4.49, discount: 25, image: 'mug.fill', category: 'beverages' },
    { id: '4', name: 'Organic Eggs', price: 5.99, discount: 30, image: 'egg.fill', category: 'dairy' },
    { id: '5', name: 'Fresh Strawberries', price: 6.99, discount: 20, image: 'leaf.fill', category: 'fruits' }
  ];

  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const filteredOffers = React.useMemo(() => {
    if (selectedCategory === 'all') return specialOffers;
    return specialOffers.filter(offer => offer.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => router.push(`/category/${item.id}?name=${item.name}`)}
    >
      <ThemedView style={styles.categoryIcon}>
        <IconSymbol name={item.icon} size={24} color="#808080" />
      </ThemedView>
      <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem}>
      <ThemedView style={styles.productImage}>
        <IconSymbol name={item.image} size={40} color="#808080" />
      </ThemedView>
      <ThemedText style={styles.productName}>{item.name}</ThemedText>
      <ThemedText style={styles.productPrice}>${item.price.toFixed(2)}</ThemedText>
    </TouchableOpacity>
  );

  const renderSpecialOffer = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.offerItem}>
      <ThemedView style={styles.offerImage}>
        <IconSymbol name={item.image} size={40} color="#808080" />
      </ThemedView>
      <View style={styles.offerInfo}>
        <ThemedText style={styles.offerName}>{item.name}</ThemedText>
        <View style={styles.offerPricing}>
          <ThemedText style={styles.offerPrice}>
            ${(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
          </ThemedText>
          <ThemedText style={styles.offerOriginal}>${item.price.toFixed(2)}</ThemedText>
          <ThemedView style={styles.discountBadge}>
            <ThemedText style={styles.discountText}>{item.discount}% OFF</ThemedText>
          </ThemedView>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerImage={welcomeHeader}
      headerBackgroundColor={{ dark: '#C6A052', light: '#C6A052' }}
    >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
        
        <ThemedText style={styles.sectionTitle}>Featured Products</ThemedText>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
        
        <ThemedText style={styles.sectionTitle}>Special Offers</ThemedText>
        <FlatList
          data={filteredOffers}
          renderItem={renderSpecialOffer}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.offersList}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  parallaxBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  categoriesList: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
  productsList: {
    paddingHorizontal: 8,
  },
  productItem: {
    width: 140,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  offersList: {
    gap: 12,
  },
  offerItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  offerImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  offerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  offerName: {
    fontSize: 16,
    marginBottom: 8,
  },
  offerPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerPrice: {
    fontSize: 18,
    fontWeight: '600',
  },
  offerOriginal: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  discountBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedCategory: {
    backgroundColor: '#C6A052',
    borderRadius: 12,
    padding: 8,
  },
  selectedCategoryIcon: {
    backgroundColor: 'transparent',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
