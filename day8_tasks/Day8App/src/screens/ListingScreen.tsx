import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchItems, Item } from '../services/itemService';
import { usePreferences } from '../hooks/usePreferences';
import { useTheme } from '../hooks/useTheme';
import { useDebounce } from '../hooks/useDebounce'; // <-- Imported debounce hook

type Props = NativeStackScreenProps<RootStackParamList, 'Listing'>;

export default function ListingScreen({ navigation }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Search state & debounce setup
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearch = useDebounce(searchQuery, 400); // Waits 400ms after user stops typing

  const { favorites, toggleFavorite } = usePreferences();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);
      const data = await fetchItems();
      setItems(data);
    } catch (err: any) {
      if (items.length === 0) {
        setError(err.message || 'Failed to load items');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  // Filter items using the debounced search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.statusText, { color: isDark ? '#aaa' : '#666' }]}>Loading products...</Text>
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadData(false)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>

      {/* Header Row with Title and Theme Toggle */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>Available Products 🛍️</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{isDark ? '☀️ Light' : '🌙 Dark'}</Text>
        </TouchableOpacity>
      </View>

      {/* Debounced Search Input */}
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
            color: isDark ? '#fff' : '#000',
            borderColor: isDark ? '#333' : '#ddd'
          }
        ]}
        placeholder="Search products..."
        placeholderTextColor={isDark ? '#888' : '#aaa'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#007AFF']} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isDark ? '#aaa' : '#888' }]}>
              📭 No products found matching "{searchQuery}"
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const itemIdStr = item.id.toString();
          const isFav = favorites.includes(itemIdStr);
          const formattedPrice = `$${item.price.toFixed(2)}`;

          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}
              onPress={() =>
                navigation.navigate('Details', {
                  itemId: itemIdStr,
                  itemName: item.title,
                  itemPrice: formattedPrice,
                })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.itemTitle, { color: isDark ? '#fff' : '#333' }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleFavorite(itemIdStr)}
                  style={styles.favButton}
                >
                  <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemCategory}>Category: {item.category.toUpperCase()}</Text>

              <Text style={[styles.itemBody, { color: isDark ? '#bbb' : '#666' }]} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={[styles.cardFooter, { borderTopColor: isDark ? '#333' : '#f0f0f0' }]}>
                <Text style={styles.itemPrice}>{formattedPrice}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  listContainer: { flexGrow: 1, paddingBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  themeButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  themeButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  searchInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 16 },
  card: { padding: 16, borderRadius: 10, marginBottom: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 8 },
  itemCategory: { fontSize: 11, fontWeight: '600', color: '#007AFF', marginBottom: 6 },
  itemBody: { fontSize: 14, marginBottom: 10, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderTopWidth: 1, paddingTop: 8 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#28a745' },
  favButton: { padding: 4 },
  favIcon: { fontSize: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  statusText: { marginTop: 10, fontSize: 16 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, textAlign: 'center' },
});