import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import MapButton from '../../components/MapButton'; // Adjust the path as necessary
import iconCenter from '../../assets/map_center.png'; // Adjust the path as necessary
import BurgerMenu from '../../newComponents/BurgerMenu';

const { width, height } = Dimensions.get('window');

interface ILatLng {
  latitude: number;
  longitude: number;
}

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
        {/* <BurgerMenu /> */}
        <Card.Content>
            <Text style={styles.searchText}>Searching the nearest driver ... </Text>
            <ActivityIndicator animating={true} color="#FFF" size="small" />
        </Card.Content>
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
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.ripple}
            />
            <View style={styles.marker} />
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
    backgroundColor: '#B80028',
    borderRadius:0,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    padding: 40,
    zIndex: 2,
    width:'100%',
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
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginBottom: 20,
  
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, // Match the ripple size
    height: 80, // Match the ripple size
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: '#B80028',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    position: 'absolute', // Place the marker at the center of the ripple
    zIndex: 1,
  },
  ripple: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300, // Increase the width
    height: 300, // Increase the height
    marginLeft: -150, // Adjust the position to center
    marginTop: -150,  // Adjust the position to center
    borderRadius: 150, // Make it fully round
    backgroundColor: 'rgba(184, 0, 40, 0.3)', // Light red with transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 3,
  },
});

export default DriverSearchingScreen;
