import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      {/* Your app navigation will go here */}
    </NavigationContainer>
  );
}