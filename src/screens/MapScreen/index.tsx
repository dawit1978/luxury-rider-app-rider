import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MapButton from '../../components/MapButton';
import iconCenter from '../../assets/map_center.png';
import whereCar from '../../assets/icons/whereCar.png';
import services from '../../assets/icons/services.png';
import { DrawerParamsList } from '../../../types';

const { height } = Dimensions.get('window'); // Get the height of the window

interface ILatLng {
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC = () => {
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
      },
    );
  }, []);

  const navigation = useNavigation<NavigationProp<DrawerParamsList>>();
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  function centerMap() {
    mapRef?.animateToRegion(
      {
        ...latLng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(map) => {
          mapRef = map;
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 8.9831,
          longitude: 38.8101,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={latLng} />
      </MapView>
      <MapButton style={styles.locationIcon} icon={iconCenter} noMargin onPress={centerMap} />
       
      {/* <TouchableOpacity style={styles.locationIcon} onPress={centerMap}>
        <Image source={services} style={styles.servicesIcon} />
      </TouchableOpacity> */}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.expandContainer}
          onPress={() => navigation.navigate('WhereToScreen')}
        >
          <Image source={whereCar} style={styles.whereCarIcon} />
          <TextInput
            placeholder="Where to..."
            placeholderTextColor={'#B80028'}
            style={styles.inputHorizontal}
            editable={false}
          />
          <TouchableOpacity style={styles.servicesButton}onPress={() => navigation.navigate('TabBarNavigator')}>
            <Image source={services} style={styles.servicesIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationIcon: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  },
  expandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whereCarIcon: {
    width: 36,
    height: 34,
    marginRight: 10,
  },
  inputHorizontal: {
    flex: 7, // 70% of the space
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5, // Margin between input and services icon
  },
  servicesButton: {
    flex: 3, // 25% of the space
    backgroundColor: '#B80028',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  servicesIcon: {
    width: 30,
    height: 30,
  },
});

export default MapScreen;
