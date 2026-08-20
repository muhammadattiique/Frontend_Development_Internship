import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  username: string;
  email: string;
  age: string;
};

export default function ReactHookFormScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'onChange', // Evaluates form validity instantly on change
    defaultValues: {
      username: '',
      email: '',
      age: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Simulate an async API save request with a random success/failure outcome
    setTimeout(() => {
      setIsLoading(false);

      // Simulating a 75% success rate for demonstration purposes
      const isSuccessful = Math.random() < 0.75;

      if (isSuccessful) {
        setSuccessMessage(`Profile successfully saved for ${data.username}! 🎉`);
        reset(); // Clear form fields on successful save
      } else {
        setErrorMessage('Failed to save profile. Server encountered an unexpected error. Please try again.');
      }
    }, 1500);
  };

  // Button should be disabled if form is dirty/invalid, or currently loading
  const isSubmitDisabled = !isDirty || !isValid || isLoading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📋 Enhanced Profile Form</Text>
        <Text style={styles.description}>
          Inline validation, disabled states, success banners, and simulated save errors.
        </Text>

        {/* Success Banner */}
        {successMessage && (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{successMessage}</Text>
          </View>
        )}

        {/* Failed Save Banner */}
        {errorMessage && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        )}

        <View style={styles.card}>
          {/* Username Field */}
          <Text style={styles.label}>Username</Text>
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
            }}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.username && styles.errorInput]}
                placeholder="Enter username"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.username && <Text style={styles.inlineErrorText}>{errors.username.message}</Text>}

          {/* Email Field */}
          <Text style={styles.label}>Email Address</Text>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address format',
              },
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Enter email"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.inlineErrorText}>{errors.email.message}</Text>}

          {/* Age Field */}
          <Text style={styles.label}>Age</Text>
          <Controller
            control={control}
            rules={{
              required: 'Age is required',
              min: { value: 18, message: 'You must be at least 18 years old' },
            }}
            name="age"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.age && styles.errorInput]}
                placeholder="Enter age"
                placeholderTextColor="#999"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.age && <Text style={styles.inlineErrorText}>{errors.age.message}</Text>}

          {/* Submit Button with Dynamic Disabled & Loading State */}
          <TouchableOpacity
            style={[styles.button, isSubmitDisabled && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitDisabled}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  scrollContainer: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#111', marginBottom: 6 },
  description: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 16 },
  successBanner: { backgroundColor: '#e8f8f5', borderWidth: 1, borderColor: '#27ae60', padding: 12, borderRadius: 8, marginBottom: 16 },
  successBannerText: { color: '#27ae60', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  errorBanner: { backgroundColor: '#fdedec', borderWidth: 1, borderColor: '#e74c3c', padding: 12, borderRadius: 8, marginBottom: 16 },
  errorBannerText: { color: '#c0392b', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#111', backgroundColor: '#fff', marginBottom: 4 },
  errorInput: { borderColor: '#e74c3c' },
  inlineErrorText: { color: '#e74c3c', fontSize: 12, marginBottom: 12 },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  disabledButton: { backgroundColor: '#93c5fd' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});