import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export default function LocationScreen() {
  const [locationStatus, setLocationStatus] = useState('checking');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  // Select location permission type based on OS
  const locationPermission = Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {
    checkInitialPermission();
  }, []);

  const checkInitialPermission = async () => {
    try {
      const result = await check(locationPermission);
      setLocationStatus(result);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        fetchCoordinates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleRequestLocation = async () => {
    try {
      let result = await check(locationPermission);

      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(locationPermission);
      }

      setLocationStatus(result);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        Alert.alert('Success', 'Location permission granted!');
        fetchCoordinates();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to show your coordinates.'
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isGranted = locationStatus === RESULTS.GRANTED || locationStatus === RESULTS.LIMITED;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Location Permission Flow</Text>
      <Text style={styles.description}>
        Request location permission and show coordinates only if granted.
      </Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Permission State:</Text>
        <Text style={[styles.statusValue, isGranted && styles.grantedText]}>
          {locationStatus}
        </Text>
      </View>

      {/* Conditionally render coordinates only if permission is granted */}
      {isGranted ? (
        <View style={styles.coordsBox}>
          <Text style={styles.coordsTitle}>Current Coordinates:</Text>
          {coordinates ? (
            <>
              <Text style={styles.coordText}>Latitude: {coordinates.latitude}</Text>
              <Text style={styles.coordText}>Longitude: {coordinates.longitude}</Text>
            </>
          ) : (
            <Text style={styles.coordText}>Fetching location...</Text>
          )}
        </View>
      ) : (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>Coordinates hidden. Grant permission to view location.</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRequestLocation}>
        <Text style={styles.buttonText}>{isGranted ? 'Refresh Coordinates' : 'Grant Location Permission'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  description: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  statusBox: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, width: '100%', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  statusLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  statusValue: { fontSize: 16, fontWeight: 'bold', color: '#f39c12', textTransform: 'capitalize' },
  grantedText: { color: '#27ae60' },
  coordsBox: { backgroundColor: '#e8f8f5', padding: 16, borderRadius: 8, width: '100%', marginBottom: 24, borderWidth: 1, borderColor: '#27ae60' },
  coordsTitle: { fontSize: 16, fontWeight: '600', color: '#27ae60', marginBottom: 8 },
  coordText: { fontSize: 14, color: '#333', marginBottom: 4 },
  warningBox: { backgroundColor: '#fdedec', padding: 16, borderRadius: 8, width: '100%', marginBottom: 24, borderWidth: 1, borderColor: '#e74c3c' },
  warningText: { color: '#c0392b', fontSize: 14, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});