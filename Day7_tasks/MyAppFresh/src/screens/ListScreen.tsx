import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { sampleData, ListItemData } from '../data/sampleData';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { shadows } from '../constants/shadows';
import { platformStyles } from '../constants/platformStyles';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Profile: undefined;
  Details: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ListItemData[]>(sampleData);

  const renderItem = ({ item }: { item: ListItemData }) => (
    <TouchableOpacity
      style={[styles.card, shadows.small]}
      onPress={() => navigation.navigate('Details')}
      activeOpacity={0.7}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer statusBarStyle="dark-content" edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.toggleRow}>
          <Button
            title={items.length > 0 ? "Clear List (Test Empty)" : "Restore Data"}
            onPress={() => setItems(items.length > 0 ? [] : sampleData)}
            color={items.length > 0 ? colors.error || '#d9534f' : colors.primary}
          />
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}

          // 1. ListHeaderComponent: Appears at the top of the list view
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.header}>List Screen</Text>
              <Text style={styles.headerSubtitle}>Total items: {items.length}</Text>
            </View>
          }

          // 2. ItemSeparatorComponent: Renders spacing automatically between elements
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}

          // 3. ListEmptyComponent: Handles the empty array condition gracefully
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No items found in the list.</Text>
            </View>
          }
        />

        <Button
          title="Back to Home"
          onPress={() => navigation.goBack()}
          style={{ marginBottom: insets.bottom || spacing.sm }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  toggleRow: {
    marginBottom: spacing.md,
  },
  headerContainer: {
    marginBottom: spacing.md,
  },
  header: {
    ...typography.h2,
    color: colors.text,
  },
  headerSubtitle: {
    ...typography.caption,
    color: '#666',
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: platformStyles.borderRadius,
    padding: spacing.md,
  },
  itemTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  itemSubtitle: {
    ...typography.caption,
    color: '#777',
    marginTop: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: '#888',
    textAlign: 'center',
  },
});