import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900'
  };

  const settingsOptions = [
    { title: 'Edit Profile', onPress: () => {} },
    { title: 'Delivery Addresses', onPress: () => {} },
    { title: 'Payment Methods', onPress: () => {} },
    { title: 'Order History', onPress: () => {} },
    { title: 'Notifications', onPress: () => {} },
    { title: 'Help & Support', onPress: () => {} },
    { title: 'Sign Out', onPress: () => {} }
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.userInfoSection}>
          <ThemedText style={styles.title}>{userInfo.name}</ThemedText>
          <ThemedText style={styles.subtitle}>{userInfo.email}</ThemedText>
          <ThemedText style={styles.subtitle}>{userInfo.phone}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.settingsSection}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingsOption}
              onPress={option.onPress}
            >
              <ThemedText style={styles.optionText}>{option.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userInfoSection: {
    marginBottom: 24,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingsSection: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingsOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
});