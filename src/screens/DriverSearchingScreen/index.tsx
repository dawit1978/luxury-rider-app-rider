import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapButton from '../../components/MapButton'; // Adjust the path as necessary
import iconCenter from '../../assets/map_center.png'; // Adjust the path as necessary
import BurgerMenu from '../../newComponents/BurgerMenu';
import SearchingDriver from '../../newComponents/SearchingDriver';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface ILatLng {
  latitude: number;
  longitude: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RippleEffect = () => {
  const radius = useSharedValue(0);

  useEffect(() => {
    radius.value = withRepeat(
      withTiming(150, { duration: 2000, easing: Easing.ease }),
      -1,
      false
    );
  }, [radius]);

  const animatedProps = useAnimatedProps(() => ({
    r: radius.value.toString(),
    opacity: 1 - radius.value / 150,
  }));

  return (
    <Svg height="300" width="300" style={styles.svg}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#B80028" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FF0000" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>
      <AnimatedCircle
        cx="150"
        cy="150"
        fill="url(#grad)"
        animatedProps={animatedProps}
      />
      <Circle cx="150" cy="150" r="10" fill="#B80028" />
    </Svg>
  );
};

const DriverSearchingScreen: React.FC = () => {
  const [latLng, setLatLng] = useState<ILatLng>({
    latitude: 8.9831,
    longitude: 38.8101,
  });

  let mapRef: MapView | null = null;

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLatLng({ latitude, longitude });
      },
      () => {
        Alert.alert('Error', 'Failed to get your current location');
      },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }, []);

  function centerMap() {
    mapRef?.animateToRegion(
      {
        ...latLng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Card style={styles.searchCard}>
        <SearchingDriver />
      </Card>

      <MapView
        ref={(map) => {
          mapRef = map;
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latLng.latitude,
          longitude: latLng.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={latLng}>
          <View style={styles.markerContainer}>
            <RippleEffect />
          </View>
        </Marker>
      </MapView>

      {/* Map Center Button */}
      <MapButton
        style={styles.locationIcon}
        icon={iconCenter}
        noMargin
        onPress={centerMap}
      />
     
      {/* BurgerMenu at the Bottom */}
      <View style={styles.burgerMenuContainer}>
        <BurgerMenu  left={10} zIndex={5} />
      </View>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCard: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 2,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  searchText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  map: {
    marginTop:400,
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:200,
    width: 300, // Match the ripple size
    height: 300, // Match the ripple size
  },
  svg: {
    position: 'absolute',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 3,
  },
  burgerMenuContainer: {
    // position: 'absolute',
    bottom: 30,
    width: '100%',
    // zIndex: 4,
  },
});

export default DriverSearchingScreen;
