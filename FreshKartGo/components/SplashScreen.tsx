import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E1E1E', '#000000']}
        style={styles.background}
      >
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          style={styles.circleContainer}
        >
          <View style={styles.circle} />
        </Animatable.View>

        <Animatable.Image
          source={require('../assets/images/logo.png')}
          animation="zoomIn"
          duration={1000}
          delay={500}
          style={styles.logo}
        />

        <Animatable.Text
          animation="fadeIn"
          duration={1000}
          delay={1500}
          style={styles.tagline}
        >
          TASTE THE FRESHNESS, TRUST THE PRICE
        </Animatable.Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    borderWidth: 2,
    borderColor: '#C6A052',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  tagline: {
    color: '#C6A052',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    letterSpacing: 1,
  },
});