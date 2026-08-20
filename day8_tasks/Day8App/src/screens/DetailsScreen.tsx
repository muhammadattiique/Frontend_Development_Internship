import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  // Safely extract params with fallbacks if accessed directly
  const { itemId = 'N/A', itemName = 'Unknown Item', itemPrice = '$0.00' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details 🔍</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID: {itemId}</Text>
        <Text style={styles.name}>{itemName}</Text>
        <Text style={styles.price}>{itemPrice}</Text>
      </View>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 20, elevation: 3 },
  label: { fontSize: 14, color: '#888', marginBottom: 4 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  price: { fontSize: 18, color: '#2e7d32', fontWeight: '600' },
});