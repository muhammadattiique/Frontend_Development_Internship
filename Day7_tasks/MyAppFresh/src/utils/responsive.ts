import { Dimensions } from 'react-native';

const BASE_WIDTH = 375;
const { width: screenWidth } = Dimensions.get('window');

export function scale(size: number): number {
  return Math.round((screenWidth / BASE_WIDTH) * size);
}

export function scaleFont(size: number): number {
  const newSize = scale(size);
  return Math.max(newSize, size * 0.85);
}