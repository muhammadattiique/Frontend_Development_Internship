import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([
    { id: '1', name: 'React Native Blueprint', liked: true },
    { id: '2', name: 'Advanced Spring Boot', liked: false },
  ]);

  const toggleLike = (id: string) => {
    setFavorites(prev =>
      prev.map(item => item.id === id ? { ...item, liked: !item.liked } : item)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites ❤️</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Text style={styles.heart}>{item.liked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  itemText: { fontSize: 16, color: '#333' },
  heart: { fontSize: 22 },
});