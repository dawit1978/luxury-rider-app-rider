import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card, Text } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BurgerMenu from '../../newComponents/BurgerMenu'; // Adjust the path as necessary
import CustomButton from '../../newComponents/Button';
import { StackParamsList } from '../../../types';

const DriverFoundScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();


  // const handleServicePress = () => {
  //   navigation.navigate('ServiceScreen'); // Assuming you have a ServiceScreen to navigate to
  // };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 8.9831,
          longitude: 38.8101,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 8.9831, longitude: 38.8101 }}
        />
      </MapView>

      {/* BurgerMenu Component */}
      <BurgerMenu style={styles.burgerMenu} />

      {/* Notification Card */}
      <Card style={styles.notificationCard}>
        <Text style={styles.title}>Driver Found</Text>
        <Text style={styles.subtitle}>Your driver will arrive soon</Text>
      </Card>

      {/* Custom Button */}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  burgerMenu: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  notificationCard: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth:2,
    borderColor:'#B80028',
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: '#B80028',
    fontWeight: 'bold',
    paddingTop:20,
    marginLeft:30,
  },
  subtitle: {
    fontSize: 14,
    color: '#B80028',
    marginTop: 10,
  },
  serviceButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#B80028',
  },
});

export default DriverFoundScreen;
