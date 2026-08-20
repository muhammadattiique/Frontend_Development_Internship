import React from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

interface ScreenContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'dark-content' | 'light-content';
  edges?: Edge[];
  style?: ViewStyle;
}

export default function ScreenContainer({
  children,
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
  edges = ['top', 'left', 'right'],
  style,
}: ScreenContainerProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.container, { backgroundColor }, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});