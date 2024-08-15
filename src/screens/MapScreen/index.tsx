import React, { useState, useEffect, useRef } from 'react';
import { Alert, Animated, View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card, TextInput, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MapButton from '../../components/MapButton';
import iconCenter from '../../assets/map_center.png';
import whereCar from '../../assets/icons/whereCar.png';
import services from '../../assets/icons/services.png';
import RideHistoryCard from '../../newComponents/RideHistoryCard'; // Adjust the path as necessary
import CustomButton from '../../newComponents/Button';

const { height } = Dimensions.get('window'); // Get the height of the window

interface ILatLng {
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC = () => {
  const [phase, setPhase] = useState<number>(1);
  const [startLocation, setStartLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([]);
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  const [isStartTyping, setIsStartTyping] = useState<boolean>(false);
  const [isDestinationTyping, setIsDestinationTyping] = useState<boolean>(false);
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(90)).current; // Start with the collapsed height

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

  const handleAddStop = () => {
    if (locations.length < 3) {
      setLocations([...locations, '']);
    }
  };

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

  const togglePanelExpansion = () => {
    setIsPanelExpanded(!isPanelExpanded);
    Animated.timing(animation, {
      toValue: isPanelExpanded ? 90 : height, // Expand to full screen height
      duration: 300,
      useNativeDriver: false,
    }).start();
    if (!isPanelExpanded) {
      setPhase(2);
    } else {
      setPhase(1);
    }
  };
  const handleDone = () => {
    console.log('Cancel Ride confirmed with reasons:', reasons);
    navigation.navigate('ListingScreen'); // Assuming you navigate back to Home or some other screen after cancel
  };
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

      {/* Expand/Collapse Button */}
      <IconButton
        icon={isPanelExpanded ? "chevron-down" : "chevron-up"}
        size={24}
        onPress={togglePanelExpansion}
        style={styles.expandIcon}
      />

      <Animated.View style={[styles.panel, { height: animation }]}>
        {!isPanelExpanded && (
          <TouchableOpacity style={styles.inputContainerHorizontal} onPress={togglePanelExpansion}>
            <Image source={whereCar} style={styles.carImage} />
            <TextInput
              placeholder="Where to..."
              style={styles.inputHorizontal}
              editable={false}
            />
            <TouchableOpacity onPress={() => navigation.navigate('TabBarNavigator')}>
              <Image source={services} style={styles.servicesIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}

        {isPanelExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.inputContainerVertical}>
              <Card style={styles.inputCard}>
              <TextInput
                label="Start"
                placeholder="Start"
                value={startLocation}
                onChangeText={(text) => {
                    setStartLocation(text);
                    setIsStartTyping(!!text); // Update state when typing starts
                }}
                style={styles.input}
                />
              </Card>
              {locations.map((location, index) => (
                <Card key={index} style={styles.inputCard}>
                  <TextInput
                    label={`Stop ${index + 1}`}
                    placeholder={`Stop ${index + 1}`}
                    value={location}
                    onChangeText={(text) => {
                      const newLocations = [...locations];
                      newLocations[index] = text;
                      setLocations(newLocations);
                    }}
                    style={styles.input}
                  />
                </Card>
              ))}
              {locations.length < 3 && (
                <TouchableOpacity style={styles.plusIconContainer}>
                  <IconButton
                    icon="plus"
                    size={24}
                    iconColor="#B80028"
                    onPress={handleAddStop}
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              )}
              <Card style={styles.inputCard}>
              <TextInput
                label="Destination"
                placeholder="Destination"
                value={destination}
                onChangeText={(text) => {
                    setDestination(text);
                    setIsDestinationTyping(!!text); // Update state when typing starts
                }}
                style={styles.input}
                />
              </Card>
            </View>

            <ScrollView style={styles.historyScroll}>
              <View style={styles.historyContainer}>
                <RideHistoryCard
                  startLocation="Bole, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="2000birr"
                  date="2024-08-01"
                />
                <RideHistoryCard
                  startLocation="Iebu, Addis Ababa, Ethiopia"
                  destination="Hilton Hotel"
                  price="1500birr"
                  date="2024-07-30"
                />
                <RideHistoryCard
                  startLocation="Piyasa, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="birr1800"
                  date="2024-07-28"
                />
                 <RideHistoryCard
                  startLocation="Piyasa, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="birr1800"
                  date="2024-07-28"
                />
                 <RideHistoryCard
                  startLocation="Piyasa, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="birr1800"
                  date="2024-07-28"
                />
                 <RideHistoryCard
                  startLocation="Piyasa, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="birr1800"
                  date="2024-07-28"
                />
                 <RideHistoryCard
                  startLocation="Piyasa, Addis Ababa, Ethiopia"
                  destination="Skylight Hotel"
                  price="birr1800"
                  date="2024-07-28"
                />
              </View>
            </ScrollView>
                {/* Conditionally render the Done button */}
                {(isStartTyping && isDestinationTyping) && (
                    <CustomButton title='Done' onPress={handleDone} />
                )}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  panel: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
    elevation: 3,
    zIndex: 2,
  },
  expandIcon: {
    position: 'absolute',
    bottom: 100,
    left: '65%',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 60, // Increased background size
    height: 60, // Increased background size
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  inputContainerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#f0f0f0',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    elevation: 3,
  },
  inputContainerVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    position: 'relative',
  },
  expandedContent: {
    flex: 1,
    marginTop: 20, // Added margin top when fully expanded
    // position:'absolute'
  },
  carImage: {
    width: 36,
    height: 34,
    marginRight: 10,
  },
  servicesIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputHorizontal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#B80028',
    borderRadius: 10,
    marginRight: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
  },
  inputCard: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  plusIconContainer: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 5,
  },
  plusIcon: {
    margin: 0,
  },
  historyScroll: {
    flex: 1,
    marginTop: 10, // Added margin top to separate from input fields
  },
  historyContainer: {
    padding: 10,
  },
  locationIcon: {
    // Customize the location icon button style
},
});

export default MapScreen;