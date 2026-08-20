import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput as RNTextInput,
  AppState,
  AppStateStatus,
  FlatList,
} from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useForm, Controller } from 'react-hook-form';

const STORAGE_KEY = '@profile_image_uri';
const PROFILE_STORAGE_KEY = '@user_profile_data';
const IMAGE_STORAGE_KEY = '@user_profile_image';

// Centralized Feedback Helper (Alert Pattern)
const showFeedback = (
  type: 'success' | 'warning' | 'error',
  title: string,
  message: string
) => {
  const icon = type === 'success' ? '🎉 ' : type === 'warning' ? '⚠️ ' : '❌ ';
  Alert.alert(`${icon}${title}`, message, [{ text: 'OK' }]);
};

// Reusable Bottom Sheet Modal Component (Embedded)
interface ActionModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

function ActionModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  onConfirm,
  onCancel,
}: ActionModalProps) {
  const getHeaderColor = () => {
    switch (type) {
      case 'success': return '#27ae60';
      case 'warning': return '#f39c12';
      case 'danger': return '#e74c3c';
      default: return '#007AFF';
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <View style={[styles.indicatorBar, { backgroundColor: getHeaderColor() }]} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: getHeaderColor() }]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function App(): React.JSX.Element {
  const [currentTask, setCurrentTask] = useState<number | null>(null);

  return (
    <View style={styles.flexContainer}>
      {currentTask !== null && (
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentTask(null)}
            activeOpacity={0.2}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.backButtonText}>← Back to Tasks</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Task {currentTask}</Text>
        </View>
      )}

      <View style={styles.flexContainer}>
        {currentTask === null && <MainMenu onSelectTask={setCurrentTask} />}
        {currentTask === 1 && <Task1Screen />}
        {currentTask === 2 && <Task2Screen />}
        {currentTask === 3 && <Task3Screen />}
        {currentTask === 4 && <Task4Screen />}
        {currentTask === 5 && <Task5Screen />}
        {currentTask === 6 && <Task6Screen />}
        {currentTask === 7 && <Task7Screen />}
        {currentTask === 8 && <Task8Screen />}
        {currentTask === 9 && <Task9Screen />}
        {currentTask === 10 && <ProfileManagementScreen />}
      </View>
    </View>
  );
}

function MainMenu({ onSelectTask }: { onSelectTask: (id: number) => void }) {
  const tasks = [
    { id: 1, title: 'Task 1: Native Permission Check' },
    { id: 2, title: 'Task 2: Picture & Local Storage' },
    { id: 3, title: 'Task 3: Location Coordinates' },
    { id: 4, title: 'Task 4: KeyboardAvoidingView & Focus' },
    { id: 5, title: 'Task 5: React Hook Form Validation' },
    { id: 6, title: 'Task 6: Reusable Bottom Sheet Hub' },
    { id: 7, title: 'Task 7: AppState Foreground/Background' },
    { id: 8, title: 'Task 8: Offline Fallback & Retry UI' },
    { id: 9, title: 'Task 9: Optimized FlatList & Memoization' },
    { id: 10, title: 'Task 10: Complete Profile Management App' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.menuContainer}>
      <Text style={styles.menuTitle}>🚀 Internship Task Hub</Text>
      <Text style={styles.menuSubtitle}>Select a task below:</Text>
      {tasks.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={styles.taskCard}
          onPress={() => onSelectTask(t.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.taskCardTitle}>{t.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function Task1Screen() {
  const [mediaPermissionStatus, setMediaPermissionStatus] = useState('checking');
  const mediaPermissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  useEffect(() => {
    checkInitialPermission();
  }, []);

  const checkInitialPermission = async () => {
    try {
      const result = await check(mediaPermissionType);
      setMediaPermissionStatus(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestPermission = async () => {
    try {
      let result = await check(mediaPermissionType);
      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(mediaPermissionType);
      }
      setMediaPermissionStatus(result);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        showFeedback('success', 'Permission Granted', 'You now have access to media library.');
      } else {
        showFeedback('warning', 'Permission Denied', 'Media access permission was denied.');
      }
    } catch (error) {
      showFeedback('error', 'Error', 'Failed to request permission.');
    }
  };

  const isGranted = mediaPermissionStatus === RESULTS.GRANTED || mediaPermissionStatus === RESULTS.LIMITED;

  return (
    <View style={styles.screenCenter}>
      <Text style={styles.title}>🔒 Native Permission Hub</Text>
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Permission State:</Text>
        <Text style={[styles.statusValue, isGranted && styles.grantedText]}>
          {mediaPermissionStatus}
        </Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handleRequestPermission}>
        <Text style={styles.btnText}>Request Media Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

function Task2Screen() {
  const [mediaPermissionStatus, setMediaPermissionStatus] = useState('checking');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const mediaPermissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const savedUri = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedUri) setImageUri(savedUri);
    const result = await check(mediaPermissionType);
    setMediaPermissionStatus(result);
  };

  const handlePickOrReplaceImage = async () => {
    try {
      let result = await check(mediaPermissionType);
      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(mediaPermissionType);
      }
      setMediaPermissionStatus(result);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, async (response: ImagePickerResponse) => {
          if (response.assets && response.assets.length > 0) {
            const sourceUri = response.assets[0].uri;
            if (sourceUri) {
              setImageUri(sourceUri);
              await AsyncStorage.setItem(STORAGE_KEY, sourceUri);
              showFeedback('success', 'Image Saved', 'Profile picture successfully updated and stored.');
            }
          }
        });
      } else {
        showFeedback('warning', 'Permission Required', 'Media access permission is required to choose a picture.');
      }
    } catch (error) {
      showFeedback('error', 'Selection Failed', 'Could not select an image.');
    }
  };

  const handleRemoveImage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setImageUri(null);
      setIsDeleteModalVisible(false);
      showFeedback('success', 'Image Removed', 'Profile image has been cleared.');
    } catch (error) {
      showFeedback('error', 'Error', 'Could not remove image.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>📸 Profile Image Picker</Text>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.placeholderText}>No Image Selected</Text>
        )}
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handlePickOrReplaceImage}>
        <Text style={styles.btnText}>{imageUri ? 'Replace Profile Image' : 'Select Profile Image'}</Text>
      </TouchableOpacity>
      {imageUri && (
        <TouchableOpacity style={styles.dangerButton} onPress={() => setIsDeleteModalVisible(true)}>
          <Text style={styles.dangerButtonText}>Remove Image</Text>
        </TouchableOpacity>
      )}

      <ActionModal
        visible={isDeleteModalVisible}
        title="Delete Profile Image"
        message="Are you sure you want to remove your saved picture? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleRemoveImage}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </ScrollView>
  );
}

function Task3Screen() {
  const [locationStatus, setLocationStatus] = useState('checking');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const locationPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {
    checkInitialPermission();
  }, []);

  const checkInitialPermission = async () => {
    try {
      const result = await check(locationPermission);
      setLocationStatus(result);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        fetchCoordinates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        showFeedback('error', 'Location Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleRequestLocation = async () => {
    try {
      let result = await check(locationPermission);
      if (result !== RESULTS.GRANTED && result !== RESULTS.LIMITED) {
        result = await request(locationPermission);
      }
      setLocationStatus(result);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        fetchCoordinates();
        showFeedback('success', 'Location Acquired', 'Successfully fetched your coordinates.');
      } else {
        showFeedback('warning', 'Permission Denied', 'Location access is required to show coordinates.');
      }
    } catch (error) {
      showFeedback('error', 'Error', 'Failed to retrieve location.');
    }
  };

  const isGranted = locationStatus === RESULTS.GRANTED || locationStatus === RESULTS.LIMITED;

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>📍 Location Permissions Hub</Text>
      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Permission State:</Text>
        <Text style={[styles.statusValue, isGranted && styles.grantedText]}>{locationStatus}</Text>
      </View>
      {isGranted ? (
        <View style={styles.coordsBox}>
          <Text style={styles.coordsTitle}>Current Coordinates:</Text>
          {coordinates ? (
            <>
              <Text style={styles.coordText}>Latitude: {coordinates.latitude}</Text>
              <Text style={styles.coordText}>Longitude: {coordinates.longitude}</Text>
            </>
          ) : (
            <Text style={styles.coordText}>Fetching location...</Text>
          )}
        </View>
      ) : (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>Coordinates hidden. Grant permission to view location.</Text>
        </View>
      )}
      <TouchableOpacity style={styles.primaryButton} onPress={handleRequestLocation}>
        <Text style={styles.btnText}>{isGranted ? 'Refresh Coordinates' : 'Grant Location Permission'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Task4Screen() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', bio: '' });
  const emailRef = useRef<RNTextInput>(null);
  const phoneRef = useRef<RNTextInput>(null);
  const bioRef = useRef<RNTextInput>(null);

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email) {
      showFeedback('warning', 'Missing Fields', 'Please fill out at least your name and email.');
      return;
    }
    showFeedback('success', 'Form Submitted', `Form successfully submitted for ${formData.fullName}!`);
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView contentContainerStyle={styles.scrollPad} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>📝 Safe Form Layout</Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
            blurOnSubmit={false}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            ref={phoneRef}
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            returnKeyType="next"
            onSubmitEditing={() => bioRef.current?.focus()}
            blurOnSubmit={false}
          />
          <Text style={styles.label}>Short Bio</Text>
          <TextInput
            ref={bioRef}
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.btnText}>Submit Form</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function Task5Screen() {
  type FormData = { username: string; email: string; age: string };
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { username: '', email: '', age: '' },
  });

  const onSubmit = (data: FormData) => {
    showFeedback('success', 'Validation Passed', `Welcome, ${data.username}! Profile verified successfully.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>📋 React Hook Form</Text>
      <View style={styles.formCardFull}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          rules={{ required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } }}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              placeholder="Enter username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          rules={{ required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Enter email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Submit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Task6Screen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  type FormData = { username: string; email: string; age: string };
  const { control, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { username: '', email: '', age: '' },
  });

  const onSubmitPrompt = (data: FormData) => {
    setPendingData(data);
    setIsSubmitModalVisible(true);
  };

  const handleConfirmSave = () => {
    setIsSubmitModalVisible(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showFeedback('success', 'Profile Saved', `Profile successfully saved for ${pendingData?.username}! 🎉`);
      reset();
    }, 1500);
  };

  const isSubmitDisabled = !isDirty || !isValid || isLoading;

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>📋 Bottom Sheet Confirmations</Text>
      <View style={styles.formCardFull}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          rules={{ required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } }}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              placeholder="Enter username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          rules={{ required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Enter email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <TouchableOpacity
          style={[styles.primaryButton, isSubmitDisabled && styles.disabledButton]}
          onPress={handleSubmit(onSubmitPrompt)}
          disabled={isSubmitDisabled}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Save Profile</Text>}
        </TouchableOpacity>
      </View>

      <ActionModal
        visible={isSubmitModalVisible}
        title="Save Changes?"
        message="Are you sure you want to submit these account settings?"
        confirmText="Save Profile"
        cancelText="Review"
        type="success"
        onConfirm={handleConfirmSave}
        onCancel={() => setIsSubmitModalVisible(false)}
      />
    </ScrollView>
  );
}

function Task7Screen() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const [stateLog, setStateLog] = useState<string[]>([]);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appStateRef.current = nextAppState;
      setAppState(nextAppState);

      setStateLog((prevLog) => [
        `${new Date().toLocaleTimeString()}: App state changed to -> ${nextAppState}`,
        ...prevLog.slice(0, 4),
      ]);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>📱 AppState Behavior Monitor</Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Current State:</Text>
        <Text style={[
          styles.statusValue,
          appState === 'active' ? styles.grantedText : { color: '#f39c12' }
        ]}>
          {appState.toUpperCase()}
        </Text>
      </View>

      <Text style={[styles.label, { alignSelf: 'flex-start', marginTop: 10 }]}>
        Transition History Log:
      </Text>

      <View style={styles.formCardFull}>
        {stateLog.length === 0 ? (
          <Text style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
            Minimize or switch away from the app to see events log here...
          </Text>
        ) : (
          stateLog.map((log, index) => (
            <Text key={index} style={{ fontSize: 13, color: '#333', marginBottom: 6 }}>
              • {log}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function ErrorFallback({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>📡</Text>
      <Text style={styles.errorTitle}>Connection Failed</Text>
      <Text style={styles.errorDesc}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.btnText}>Retry Connection</Text>
      </TouchableOpacity>
    </View>
  );
}

function Task8Screen() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState<string[]>([]);

  const fetchApiData = () => {
    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      const isNetworkSuccess = Math.random() > 0.3;

      if (isNetworkSuccess) {
        setData(['Dashboard Analytics Module', 'User Profile Settings', 'Cloud Notification Stream']);
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Unable to reach the server. Please check your internet connection and try again.');
      }
    }, 1200);
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screenCenter}>
      <Text style={styles.title}>🌐 Network Fallback & Retry</Text>

      {status === 'loading' && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Fetching data from server...</Text>
        </View>
      )}

      {status === 'error' && (
        <ErrorFallback message={errorMessage} onRetry={fetchApiData} />
      )}

      {status === 'success' && (
        <View style={styles.formCardFull}>
          <Text style={styles.successHeading}>✅ Data Loaded Successfully</Text>
          {data.map((item, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataText}>• {item}</Text>
            </View>
          ))}
          <TouchableOpacity style={[styles.primaryButton, { marginTop: 16 }]} onPress={fetchApiData}>
            <Text style={styles.btnText}>Refresh Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

interface ListItemProps {
  id: string;
  title: string;
  subtitle: string;
  onPress: (id: string) => void;
}

const MemoizedRow = React.memo(({ id, title, subtitle, onPress }: ListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.optimizedRow}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <View style={styles.rowAvatar}>
        <Text style={styles.avatarText}>{title.charAt(0)}</Text>
      </View>
      <View style={styles.rowTextContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
});

function Task9Screen() {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, index) => ({
      id: String(index + 1),
      title: `Item Record #${index + 1}`,
      subtitle: `Optimized record description for item index ${index + 1}`,
    }))
  );

  const handleRowPress = (id: string) => {
    showFeedback('success', 'Row Clicked', `You selected item ID: ${id}`);
  };

  const renderItem = useCallback(({ item }) => (
    <MemoizedRow
      id={item.id}
      title={item.title}
      subtitle={item.subtitle}
      onPress={handleRowPress}
    />
  ), []);

  const ITEM_HEIGHT = 76;
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={{ padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={styles.title}>⚡ Optimized FlatList Hub</Text>
        <Text style={{ fontSize: 13, color: '#666', textAlign: 'center' }}>
          Rendering 1,000 items with getItemLayout, windowSize, and React.memo
        </Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

type ProfileFormValues = {
  username: string;
  email: string;
  phone: string;
  bio: string;
};

function ProfileManagementScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: { username: '', email: '', phone: '', bio: '' },
  });

  useEffect(() => {
    loadStoredProfile();
  }, []);

  const loadStoredProfile = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(IMAGE_STORAGE_KEY);
      const savedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedImage) setImageUri(savedImage);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setValue('username', parsed.username);
        setValue('email', parsed.email);
        setValue('phone', parsed.phone);
        setValue('bio', parsed.bio);
      }
    } catch (e) {
      console.error('Failed to load profile data', e);
    }
  };

  const handlePickImage = async () => {
    const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    let res = await check(permissionType);
    if (res !== RESULTS.GRANTED && res !== RESULTS.LIMITED) {
      res = await request(permissionType);
    }

    if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
      launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, async (response) => {
        if (response.assets && response.assets[0]?.uri) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
          await AsyncStorage.setItem(IMAGE_STORAGE_KEY, uri);
        }
      });
    }
  };

  const onSubmitProfile = async (data: ProfileFormValues) => {
    setIsLoading(true);
    setIsNetworkError(false);
    setIsSaved(false);

    setTimeout(async () => {
      setIsLoading(false);
      const isSuccess = Math.random() > 0.2; // 80% success rate simulation

      if (isSuccess) {
        await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
        setIsSaved(true);
      } else {
        setIsNetworkError(true);
      }
    }, 1500);
  };

  if (isNetworkError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>📡</Text>
        <Text style={styles.errorTitle}>Sync Failed</Text>
        <Text style={styles.errorDesc}>Unable to save profile changes to server. Check connection.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleSubmit(onSubmitProfile)}>
          <Text style={styles.btnText}>Retry Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Profile Management Hub</Text>

      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isSaved && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>🎉 Profile successfully saved & synced!</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          rules={{ required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 chars' } }}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        <Text style={styles.label}>Email Address</Text>
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>Phone Number</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          )}
        />

        <Text style={styles.label}>Bio</Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Short bio..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSubmit(onSubmitProfile)}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Save Profile</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: '#f9f9f9' },
  menuContainer: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  menuTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 6, color: '#111' },
  menuSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  taskCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  taskCardTitle: { fontSize: 15, fontWeight: '600', color: '#007AFF' },
  navBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 45 : 12, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', zIndex: 99 },
  backButton: { marginRight: 15, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#e0f2fe', borderRadius: 6 },
  backButtonText: { color: '#007AFF', fontSize: 15, fontWeight: 'bold' },
  navTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  screenCenter: { padding: 24, flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 14, color: '#333', textAlign: 'center' },
  statusBox: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 16, width: '100%', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  statusLabel: { fontSize: 15, fontWeight: '600', color: '#333' },
  statusValue: { fontSize: 15, fontWeight: 'bold', color: '#f39c12', textTransform: 'capitalize' },
  grantedText: { color: '#27ae60' },
  imageContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#e1e1e1', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#007AFF' },
  profileImage: { width: '100%', height: '100%' },
  placeholderText: { color: '#888', fontSize: 11, textAlign: 'center' },
  coordsBox: { backgroundColor: '#e8f8f5', padding: 14, borderRadius: 8, width: '100%', marginBottom: 16, borderWidth: 1, borderColor: '#27ae60' },
  coordsTitle: { fontSize: 15, fontWeight: '600', color: '#27ae60', marginBottom: 6 },
  coordText: { fontSize: 14, color: '#333', marginBottom: 2 },
  warningBox: { backgroundColor: '#fdedec', padding: 14, borderRadius: 8, width: '100%', marginBottom: 16, borderWidth: 1, borderColor: '#e74c3c' },
  warningText: { color: '#c0392b', fontSize: 13, textAlign: 'center' },
  formCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '100%', elevation: 2 },
  formCardFull: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%', elevation: 2 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#111', backgroundColor: '#fff', marginBottom: 4, width: '100%' },
  textArea: { height: 80, textAlignVertical: 'top' },
  errorInput: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 10 },
  primaryButton: { backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, width: '100%' },
  disabledButton: { backgroundColor: '#93c5fd' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  dangerButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e74c3c', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 10, width: '100%' },
  dangerButtonText: { color: '#e74c3c', fontSize: 14, fontWeight: '600' },
  scrollPad: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40, width: '100%', elevation: 10 },
  indicatorBar: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 8, textAlign: 'center' },
  modalMessage: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  buttonContainer: { flexDirection: 'row', gap: 12 },
  cancelButton: { flex: 1, backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelButtonText: { color: '#334155', fontWeight: '600', fontSize: 15 },
  confirmButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  errorContainer: { backgroundColor: '#fff', padding: 24, borderRadius: 12, alignItems: 'center', width: '100%', elevation: 2 },
  errorIcon: { fontSize: 40, marginBottom: 10 },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#e74c3c', marginBottom: 6 },
  errorDesc: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#e74c3c', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  centerContainer: { padding: 40, alignItems: 'center', justifyContent: 'center', flex: 1 },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  successHeading: { fontSize: 15, fontWeight: 'bold', color: '#27ae60', marginBottom: 12 },
  dataRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', width: '100%' },
  dataText: { fontSize: 14, color: '#333' },
  optimizedRow: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, marginHorizontal: 16, marginTop: 8, borderRadius: 8, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, height: 68 },
  rowAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#0284c7' },
  rowTextContainer: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 2 },
  rowSubtitle: { fontSize: 12, color: '#666' },
  container: { padding: 20, backgroundColor: '#f9f9f9', flexGrow: 1 },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#007AFF' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#cbd5e1' },
  avatarPlaceholderText: { fontSize: 12, fontWeight: '600', color: '#64748b' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
  successBanner: { backgroundColor: '#dcfce7', padding: 12, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  successText: { color: '#166534', fontWeight: '600', fontSize: 13 },
});