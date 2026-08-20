import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DrawerMenu'>;

export default function DrawerNavigator({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu & Settings ⚙️</Text>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.menuText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
        <Text style={styles.menuText}>❓ Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
        <Text style={styles.menuText}>ℹ️ About App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={() => navigation.replace('Auth')}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  menuItem: { paddingVertical: 16, paddingHorizontal: 20, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 12 },
  menuText: { fontSize: 18, fontWeight: '600', color: '#333' },
  logoutItem: { backgroundColor: '#ffebee', marginTop: 20 },
  logoutText: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f' },
});