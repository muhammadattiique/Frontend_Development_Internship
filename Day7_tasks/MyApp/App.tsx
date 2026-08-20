import React from 'react';
import { View, Text } from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'black', fontSize: 30 }}>
        MyApp is Working!
      </Text>
    </View>
  );
}