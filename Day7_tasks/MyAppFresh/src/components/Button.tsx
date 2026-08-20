import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { shadows } from '../constants/shadows';
import { platformStyles } from '../constants/platformStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

export default function Button({ title, onPress, color = colors.primary, style }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        shadows.medium,
        // iOS: fade the button on press. Android: ripple handles the feedback instead.
        Platform.OS === 'ios' && pressed ? { backgroundColor: shade(color) } : { backgroundColor: color },
        style,
      ]}
      android_ripple={
        Platform.OS === 'android' ? { color: 'rgba(255,255,255,0.3)', borderless: false } : undefined
      }
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

function shade(hex: string): string {
  return hex + 'cc';
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderRadius: platformStyles.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    ...typography.button,
  },
});