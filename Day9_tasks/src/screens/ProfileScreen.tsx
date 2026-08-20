import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform, ScrollView } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const STORAGE_KEY = '@profile_image_uri';

export default function ProfileScreen() {
  // Permission & Media states
  const [mediaPermissionStatus, setMediaPermissionStatus] = useState('checking');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Location states
  const [locationPermissionStatus, setLocationPermissionStatus] = useState('checking');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const mediaPermissionType = Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const locationPermissionType = Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {
    initializeAppData();
  }, []);

  const getDisplayStatus = (status: string) => {
    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      return 'Accessible';
    }
    return status;
  };

  const initializeAppData = async () => {
    try {
      // Check Media Permission & Load Saved Image
      const mediaResult = await check(mediaPermissionType);
      setMediaPermissionStatus(mediaResult);

      const savedUri = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedUri) {
        setImageUri(savedUri);
      }

      // Check Location Permission & Fetch Coordinates if permitted
      const locationResult = await check(locationPermissionType);
      setLocationPermissionStatus(locationResult);
      if (locationResult === RESULTS.GRANTED || locationResult === RESULTS.LIMITED) {
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
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Handle Image Selection / Replacement
  const handlePickOrReplaceImage = async () => {
    try {
      let result = await check(mediaPermissionType);
      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(mediaPermissionType);
      }
      setMediaPermissionStatus(result);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        const options = { mediaType: 'photo' as const, quality: 0.8 as const };
        launchImageLibrary(options, async (response: ImagePickerResponse) => {
          if (response.assets && response.assets.length > 0) {
            const sourceUri = response.assets[0].uri;
            if (sourceUri) {
              setImageUri(sourceUri);
              await AsyncStorage.setItem(STORAGE_KEY, sourceUri);
            }
          }
        });
      } else {
        Alert.alert('Permission Required', 'Media access permission is required.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Image Removal
  const handleRemoveImage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setImageUri(null);
      Alert.alert('Removed', 'Profile image has been cleared.');
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Location Permission Request
  const handleRequestLocation = async () => {
    try {
      let result = await check(locationPermissionType);
      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(locationPermissionType);
      }
      setLocationPermissionStatus(result);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        fetchCoordinates();
      } else {
        Alert.alert('Permission Denied', 'Location access is required to show coordinates.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isMediaAccessible = mediaPermissionStatus === RESULTS.GRANTED || mediaPermissionStatus === RESULTS.LIMITED;
  const isLocationAccessible = locationPermissionStatus === RESULTS.GRANTED || locationPermissionStatus === RESULTS.LIMITED;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚀 Complete Feature Hub</Text>
      <Text style={styles.description}>
        Managing Permissions, Media Gallery, Local Persistence, and Live GPS Coordinates.
      </Text>

      {/* Media Permission & Profile Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>📸 Profile & Media Section</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Media State:</Text>
          <Text style={[styles.statusValue, isMediaAccessible && styles.grantedText]}>
            {getDisplayStatus(mediaPermissionStatus)}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <Text style={styles.placeholderText}>No Image Selected</Text>
          )}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handlePickOrReplaceImage}>
          <Text style={styles.buttonText}>{imageUri ? 'Replace Profile Image' : 'Select Profile Image'}</Text>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity style={styles.dangerButton} onPress={handleRemoveImage}>
            <Text style={styles.dangerButtonText}>Remove Image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Location Permission & Coordinates Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>📍 Location & Coordinates Section</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Location State:</Text>
          <Text style={[styles.statusValue, isLocationAccessible && styles.grantedText]}>
            {getDisplayStatus(locationPermissionStatus)}
          </Text>
        </View>

        {isLocationAccessible ? (
          <View style={styles.coordsBox}>
            <Text style={styles.coordsTitle}>Current Coordinates:</Text>
            {coordinates ? (
              <>
                <Text style={styles.coordText}>Latitude: {coordinates.latitude}</Text>
                <Text style={styles.coordText}>Longitude: {coordinates.longitude}</Text>
              </>
            ) : (
              <Text style={styles.coordText}>Fetching GPS position...</Text>
            )}
          </View>
        ) : (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Coordinates hidden. Grant permission to view.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={handleRequestLocation}>
          <Text style={styles.buttonText}>{isLocationAccessible ? 'Refresh Coordinates' : 'Grant Location Permission'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5, textAlign: 'center', color: '#333' },
  description: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  statusBox: { flexDirection: 'row', backgroundColor: '#f4f6f7', padding: 12, borderRadius: 8, marginBottom: 14, justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  statusValue: { fontSize: 14, fontWeight: 'bold', color: '#f39c12', textTransform: 'capitalize' },
  grantedText: { color: '#27ae60' },
  imageContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e1e1e1', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#007AFF' },
  profileImage: { width: '100%', height: '100%' },
  placeholderText: { color: '#888', fontSize: 10, textAlign: 'center', padding: 5 },
  coordsBox: { backgroundColor: '#e8f8f5', padding: 12, borderRadius: 8, marginBottom: 14, borderWidth: 1, borderColor: '#27ae60' },
  coordsTitle: { fontSize: 14, fontWeight: '600', color: '#27ae60', marginBottom: 6 },
  coordText: { fontSize: 13, color: '#333', marginBottom: 2 },
  warningBox: { backgroundColor: '#fdedec', padding: 12, borderRadius: 8, marginBottom: 14, borderWidth: 1, borderColor: '#e74c3c' },
  warningText: { color: '#c0392b', fontSize: 13, textAlign: 'center' },
  primaryButton: { backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  dangerButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e74c3c', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  dangerButtonText: { color: '#e74c3c', fontSize: 14, fontWeight: '600' },
});