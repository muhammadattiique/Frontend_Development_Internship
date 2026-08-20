import { Platform } from 'react-native';

export const platformStyles = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  borderRadius: Platform.select({
    ios: 10,
    android: 8,
    default: 8,
  }),
  inputBorderWidth: Platform.select({
    ios: 1,
    android: 1.5,
    default: 1,
  }),
};