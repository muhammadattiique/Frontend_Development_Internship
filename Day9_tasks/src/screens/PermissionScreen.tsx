import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function PermissionScreen() {
  const [permissionStatus, setPermissionStatus] = useState('Checking...');

  const permissionType = Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const result = await check(permissionType);
      setPermissionStatus(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestPermission = async () => {
    try {
      const result = await request(permissionType);
      setPermissionStatus(result);

      if (result === RESULTS.GRANTED) {
        Alert.alert('Success', 'Permission granted successfully!');
      } else if (result === RESULTS.DENIED) {
        Alert.alert('Denied', 'Permission was denied. You can ask again.');
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Blocked',
          'Permission is permanently blocked. Please enable it manually in your phone settings.'
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Native Permission Flow</Text>
      <Text style={styles.description}>
        Task 1: Understand how Android and iOS handle runtime states.
      </Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Current State:</Text>
        <Text style={styles.statusValue}>{permissionStatus}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
        <Text style={styles.buttonText}>Request Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  description: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  statusBox: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 20, width: '100%', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  statusLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  statusValue: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});