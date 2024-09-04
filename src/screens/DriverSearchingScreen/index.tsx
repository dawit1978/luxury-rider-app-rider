import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapButton from '../../components/MapButton'; // Adjust the path as necessary
import iconCenter from '../../assets/map_center.png'; // Adjust the path as necessary
import BurgerMenu from '../../newComponents/BurgerMenu';
import SearchingDriver from '../../newComponents/SearchingDriver';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';
import WhereCar from '../../assets/icons/whereCar.png';

const { width, height } = Dimensions.get('window');

interface ILatLng {
  latitude: number;
  longitude: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RippleEffect = ({ onRadiusChange }: { onRadiusChange: (radius: number) => void }) => {
  const radius = useSharedValue(0);

  useEffect(() => {
    radius.value = withRepeat(
      withTiming(150, { duration: 2000, easing: Easing.ease }),
      -1,
      false
    );
  }, [radius]);

  useEffect(() => {
    const id = setInterval(() => {
      onRadiusChange(radius.value);
    }, 50);
    return () => clearInterval(id);
  }, [radius.value, onRadiusChange]);

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

  const [carMarkers, setCarMarkers] = useState<Array<{ coordinate: ILatLng; touched: boolean }>>([
    { coordinate: { latitude: 8.9825, longitude: 38.8095 }, touched: false },
    { coordinate: { latitude: 8.9841, longitude: 38.8110 }, touched: false },
    { coordinate: { latitude: 9.0062, longitude: 38.8232 }, touched: false },
    { coordinate: { latitude: 9.0008, longitude: 38.8219 }, touched: false },
    { coordinate: { latitude: 9.004114, longitude: 38.803746}, touched: false },
    { coordinate: { latitude: 8.9959, longitude: 38.7899 }, touched: false },
    { coordinate: { latitude: 8.9838, longitude: 38.7963 }, touched: false },
    // Add more car markers if necessary
  ]);

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

  const handleRadiusChange = (radius: number) => {
    const earthRadiusMeters = 6371000; // Radius of the Earth in meters
    const buffer = 500; // Increase buffer to 500 meters to account for discrepancies
  
    const updatedMarkers = carMarkers.map((car) => {
      const dLat = (car.coordinate.latitude - latLng.latitude) * (Math.PI / 180);
      const dLon = (car.coordinate.longitude - latLng.longitude) * (Math.PI / 180);
  
      const lat1 = latLng.latitude * (Math.PI / 180);
      const lat2 = car.coordinate.latitude * (Math.PI / 180);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      const distanceFromCenter = earthRadiusMeters * c;
      console.log(`Marker at ${car.coordinate.latitude}, ${car.coordinate.longitude}: Distance = ${distanceFromCenter}, Touched = ${touched}`);

      // Apply green effect to cars within the ripple effect, considering the buffer
      const touched = distanceFromCenter <= radius + buffer;

  
      return { ...car, touched };
    });
  
    setCarMarkers(updatedMarkers);
  };
  
  // const handleRadiusChange = (radius: number) => {
  //   const degreeOffset = radius / 111320; // Roughly, 1 degree of latitude ~ 111.32 km
  
  //   const minLat = latLng.latitude - degreeOffset;
  //   const maxLat = latLng.latitude + degreeOffset;
  //   const minLng = latLng.longitude - degreeOffset;
  //   const maxLng = latLng.longitude + degreeOffset;
  
  //   const updatedMarkers = carMarkers.map((car) => {
  //     const touched =
  //       car.coordinate.latitude >= minLat &&
  //       car.coordinate.latitude <= maxLat &&
  //       car.coordinate.longitude >= minLng &&
  //       car.coordinate.longitude <= maxLng;
  
  //     return { ...car, touched };
  //   });
  
  //   setCarMarkers(updatedMarkers);
  // };
  
  

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
            <RippleEffect onRadiusChange={handleRadiusChange} />
          </View>
        </Marker>

        {carMarkers.map((car, index) => (
          <Marker
            key={index}
            coordinate={car.coordinate}
            style={{ zIndex: car.touched ? 1 : 0 }}
          >
            <Image
              source={WhereCar}
              style={[styles.carMarker, car.touched && styles.carMarkerTouched]}
            />
          </Marker>
        ))}
      </MapView>

      {/* Map Center Button */}
      <MapButton
        style={styles.locationIcon}
        icon={iconCenter}
        noMargin
        onPress={centerMap}
      />

      {/* BurgerMenu at the Bottom */}
      <BurgerMenu style={styles.burgerMenuIcon} />

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
  map: {
    marginTop: 400,
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  burgerMenuIcon: {
    position: 'absolute',
    bottom: 70,
    left: 30,
    zIndex: 3,
  },
  carMarker: {
    width: 40,
    height: 40,
  },
  carMarkerTouched: {
    tintColor: 'green',
  },
});

export default DriverSearchingScreen;
