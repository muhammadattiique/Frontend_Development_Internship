import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer statusBarStyle="dark-content" edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.header}>Item Details Screen</Text>

        <View style={[styles.card, shadows.small]}>
          <Text style={styles.title}>Polished Mobile Component</Text>
          <Text style={styles.description}>
            This screen displays detailed information for the selected item, utilizing your project's custom typography, shadows, and platform styling tokens.
          </Text>
        </View>

        <View style={{ marginTop: 'auto' }}>
          <Button
            title="Back to Home"
            onPress={() => navigation.navigate('Home')}
            style={{ marginBottom: insets.bottom || spacing.sm }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    ...typography.h2,
    marginBottom: spacing.md,
    color: colors.text,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: platformStyles.borderRadius,
    padding: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: '#666',
  },
});