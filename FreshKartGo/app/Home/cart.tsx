import { StyleSheet, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Fresh Apples', price: 4.99, quantity: 2 },
    { id: '2', name: 'Organic Bananas', price: 3.99, quantity: 1 },
    { id: '3', name: 'Fresh Carrots', price: 2.99, quantity: 3 }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <ThemedView style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
        <ThemedText style={styles.itemPrice}>${item.price.toFixed(2)}</ThemedText>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
          <IconSymbol name="minus.circle" size={24} color="#808080" />
        </TouchableOpacity>
        <ThemedText style={styles.itemQuantity}>{item.quantity}</ThemedText>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
          <IconSymbol name="plus.circle" size={24} color="#808080" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Shopping Cart</ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
            />
            <ThemedView style={styles.footer}>
              <ThemedText style={styles.total}>Total: ${getTotalPrice().toFixed(2)}</ThemedText>
              <TouchableOpacity style={styles.checkoutButton}>
                <ThemedText style={styles.checkoutText}>Checkout</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </>
        ) : (
          <ThemedView style={styles.emptyCart}>
            <IconSymbol name="cart" size={64} color="#808080" />
            <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#808080',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemQuantity: {
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#808080',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
    gap: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});