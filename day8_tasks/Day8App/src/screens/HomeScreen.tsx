import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/TabNavigator';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home! 🏠</Text>
      <Text style={styles.subtitle}>Explore your interactive app flow.</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="View Item Listing"
          onPress={() => navigation.navigate('Listing')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Open Settings"
          onPress={() => navigation.navigate('Settings')}
          color="#555"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  buttonContainer: { width: '80%', marginBottom: 12 },
});