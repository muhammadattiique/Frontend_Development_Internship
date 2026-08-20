import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import SmartImage from '../components/SmartImage';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { shadows } from '../constants/shadows';
import { platformStyles } from '../constants/platformStyles';
import { scale, scaleFont } from '../utils/responsive';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [name, setName] = useState('');

  // Debugging & Error Tracing Handler
  const handleTestErrorTracing = () => {
    try {
      console.log('Metro Log: Attempting a safe test operation...');
      // Simulating a runtime error or bad parse to test basic error tracing
      const sampleJSON = '{"test": true'; // Intentional missing closing brace
      JSON.parse(sampleJSON);
    } catch (error) {
      console.error('Metro Error Log (Caught safely):', error);
      Alert.alert(
        'Error Tracing Caught',
        'An error was safely intercepted via try-catch. Check your Metro logs!'
      );
    }
  };

  return (
    <ScreenContainer statusBarStyle="dark-content">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { fontSize: scaleFont(typography.h1.fontSize) }]}>
            Day 7 Task
          </Text>
          <Text style={styles.subtitle}>Home Screen</Text>

          <View style={styles.imageRow}>
            <SmartImage
              source={require('../assets/images/local-logo.png')}
              width={scale(80)}
              height={scale(80)}
              label="Local"
            />
            <SmartImage
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              width={scale(80)}
              height={scale(80)}
              label="Remote"
            />
            <SmartImage
              source={{ uri: 'https://reactnative.dev/img/header_logo.png' }}
              width={scale(80)}
              height={scale(80)}
              label="Remote 2"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <View style={styles.buttonRow}>
            <Button
              title="Say Hello"
              onPress={() => Alert.alert('Hello', `Hi, ${name || 'stranger'}!`)}
              style={styles.buttonFlex}
            />

            <TouchableOpacity
              style={[styles.touchableButton, shadows.small, { backgroundColor: colors.secondary }]}
              activeOpacity={0.6}
              onPress={() => navigation.navigate('List')}
            >
              <Text style={styles.buttonText}>Go to List</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Form Navigation Button */}
          <View style={styles.actionButtonContainer}>
            <Button
              title="Open Profile Form"
              onPress={() => navigation.navigate('Profile')}
              color={colors.primary}
            />
          </View>

          {/* Error Tracing / Debug Test Button */}
          <View style={styles.actionButtonContainer}>
            <Button
              title="Test Error Tracing & Logs"
              onPress={handleTestErrorTracing}
              color="#d9534f"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: '#666',
    marginBottom: spacing.lg,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  input: {
    width: '100%',
    borderWidth: platformStyles.inputBorderWidth,
    borderColor: colors.border,
    borderRadius: platformStyles.borderRadius,
    padding: spacing.sm + 2,
    marginBottom: spacing.lg,
    ...typography.body,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  buttonFlex: {
    flex: 1,
  },
  touchableButton: {
    flex: 1,
    padding: spacing.sm + 4,
    borderRadius: platformStyles.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    ...typography.button,
  },
  actionButtonContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
});