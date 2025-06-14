import { StyleSheet, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
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
    { id: '4', name: 'Whole Milk', price: 3.49, image: 'cup.and.saucer.fill', category: 'dairy' }
  ];

  const specialOffers: Product[] = [
    { id: '5', name: 'Premium Coffee', price: 15.99, image: 'mug.fill', category: 'beverages', discount: 20 },
    { id: '6', name: 'Fresh Bread', price: 5.99, image: 'birthday.cake.fill', category: 'bakery', discount: 15 },
    { id: '7', name: 'Mixed Nuts', price: 12.99, image: 'leaf.fill', category: 'snacks', discount: 25 }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  const filteredOffers = selectedCategory === 'all'
    ? specialOffers
    : specialOffers.filter(product => product.category === selectedCategory);

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <IconSymbol 
        name={item.icon} 
        size={24} 
        color={selectedCategory === item.id ? '#FFFFFF' : '#808080'} 
      />
      <ThemedText style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
        {item.name}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <IconSymbol name={item.image} size={48} color="#808080" />
      <ThemedText style={styles.productName}>{item.name}</ThemedText>
      <View style={styles.priceContainer}>
        <ThemedText style={styles.price}>${item.price.toFixed(2)}</ThemedText>
        {item.discount && (
          <ThemedText style={styles.discount}>{item.discount}% OFF</ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSpecialOffer = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.offerItem}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View style={styles.offerContent}>
        <IconSymbol name={item.image} size={64} color="#808080" />
        <View style={styles.offerDetails}>
          <ThemedText style={styles.offerName}>{item.name}</ThemedText>
          <View style={styles.offerPriceContainer}>
            <ThemedText style={styles.offerPrice}>${item.price.toFixed(2)}</ThemedText>
            {item.discount && (
              <ThemedText style={styles.offerDiscount}>{item.discount}% OFF</ThemedText>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const welcomeHeader = (
    <View style={styles.parallaxBackground}>
      <Image 
        source={require('@/assets/images/logo.png')} 
        style={styles.logoImage} 
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <ThemedText style={styles.welcomeText}>Welcome to FreshKartGo</ThemedText>
        <ThemedText style={styles.welcomeSubtext}>Fresh groceries delivered to your door</ThemedText>
      </View>
    </View>
  );

  return (
    <ParallaxScrollView
      headerImage={welcomeHeader}
      headerBackgroundColor={{ dark: 'transparent', light: 'transparent' }}
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300, // Increased height for better visibility
    width: '100%',
    position: 'relative',
  },
  logoImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8, // Increased opacity to make the logo more visible
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay for better text readability
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
