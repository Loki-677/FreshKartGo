import { View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useBottomTabOverflow() {
  return 0;
}

// Export a simple background component
export default function TabBarBackground() {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: Colors[colorScheme].background,
      }}
    />
  );
}
