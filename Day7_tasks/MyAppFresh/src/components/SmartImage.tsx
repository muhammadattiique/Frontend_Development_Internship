import React, { useState } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

interface SmartImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  width: number;
  height: number;
  label?: string;
}

export default function SmartImage({ source, style, width, height, label }: SmartImageProps) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <View style={[styles.box, { width, height }]}>
        <Text style={styles.fallbackIcon}>🖼️</Text>
        <Text style={styles.fallbackText}>Image failed to load</Text>
      </View>
    );
  }

  return (
    <View style={[styles.box, { width, height }]}>
      <Image
        source={source}
        style={[{ width, height }, style]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
        resizeMode="cover"
      />
      {loading && (
        <View style={[styles.overlay, { width, height }]}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  fallbackIcon: {
    fontSize: 28,
  },
  fallbackText: {
    ...typography.caption,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  label: {
    ...typography.caption,
    marginTop: spacing.xs,
    color: '#666',
  },
});