import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { platformStyles } from '../constants/platformStyles';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation touched states to show errors only after interaction
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // Simple validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  // Form is only valid if both fields pass criteria
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = () => {
    if (!isFormValid) return;
    Alert.alert('Success', 'Profile updated / Login successful!');
    navigation.goBack();
  };

  return (
    <ScreenContainer statusBarStyle="dark-content" edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile / Login</Text>

        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              touchedEmail && !isEmailValid && styles.inputError,
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onBlur={() => setTouchedEmail(true)}
          />
          {touchedEmail && !isEmailValid && (
            <Text style={styles.errorText}>Please enter a valid email address.</Text>
          )}
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              touchedPassword && !isPasswordValid && styles.inputError,
            ]}
            placeholder="Enter at least 6 characters"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouchedPassword(true)}
          />
          {touchedPassword && !isPasswordValid && (
            <Text style={styles.errorText}>Password must be at least 6 characters long.</Text>
          )}
        </View>

        {/* Submit Button with Disabled State Styling */}
        <View style={styles.submitContainer}>
          <View style={!isFormValid && styles.disabledButtonWrapper}>
            <Button
              title="Save Changes"
              onPress={handleSubmit}
              // If your Button component handles disabling natively, pass it, or wrap behavior:
              style={!isFormValid ? { opacity: 0.5 } : undefined}
            />
          </View>
          {!isFormValid && (
            <Text style={styles.helperText}>Please fill in all fields correctly to continue.</Text>
          )}
        </View>

        <View style={{ marginTop: 'auto' }}>
          <Button
            title="Back to Home"
            onPress={() => navigation.goBack()}
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
    marginBottom: spacing.lg,
    color: colors.text,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    width: '100%',
    borderWidth: platformStyles.inputBorderWidth,
    borderColor: colors.border,
    borderRadius: platformStyles.borderRadius,
    padding: spacing.sm + 2,
    ...typography.body,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#d9534f',
  },
  errorText: {
    ...typography.caption,
    color: '#d9534f',
    marginTop: spacing.xs,
  },
  submitContainer: {
    marginTop: spacing.md,
  },
  disabledButtonWrapper: {
    // Optional wrapper style adjustments for disabled state
  },
  helperText: {
    ...typography.caption,
    color: '#888',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});