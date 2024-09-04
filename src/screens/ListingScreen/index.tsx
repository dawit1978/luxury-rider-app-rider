import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageSourcePropType, ScrollView } from 'react-native';
import { Appbar, TextInput, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BackButton from '../../newComponents/BackButton';
import CarCard from '../../newComponents/CarCard';

import mercedes from '../../assets/cars/mercedes.png';
import rangeRover from '../../assets/cars/range-rover.png';
import landCruiser from '../../assets/cars/land-cruiser.png';
import { DrawerParamsList } from '../../../types';

type carDetailType= {
     name: string;
     imagePath: ImageSourcePropType;
     price: string;
     category: 'VIP'|'VVIP'|'Corporate';
     seats: number;
     speed: string;
     dropOffTime: string;
}

const ListingScreen = () => {
  const [selectedFilter, setSelectedFilter] = React.useState('All');
  const [location, setLocation] = React.useState('');
  const navigation = useNavigation<NavigationProp<DrawerParamsList>>();


  const carsData: Array<carDetailType> = [
    {
      name: 'MINI SUV',
      imagePath: rangeRover,
      price: '10,000 birr/day',
      category: 'VVIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00',
    },
    {
      name: 'SUV',
      imagePath: mercedes,
      price: '10,000 birr/day',
      category: 'VVIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00',
    },
    {
      name: 'SEDAN',
      imagePath: landCruiser,
      price: '10,000 birr/day',
      category: 'VIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00',
    },
    {
      name: 'NISSAN',
      imagePath: landCruiser,
      price: '10,000 birr/day',
      category: 'VIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00',
    },
    {
      name: 'MARCEDES',
      imagePath: landCruiser,
      price: '10,000 birr/day',
      category: 'VIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00',
    },
  
  ];

  const filteredCars = selectedFilter === 'All'
    ? carsData
    : carsData.filter(car => car.category === selectedFilter);

  const handleLocationClick = () => {
    navigation.navigate('WhereToScreen', { focusInput: 'start' });
  };

  const handleAddStopClick = () => {
    navigation.navigate('WhereToScreen', { focusInput: 'plus' });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <BackButton />
        <View style={styles.locationContainer}>
          <IconButton
            icon="map-marker"
            iconColor='#B80028'
            onPress={() => {}}
          />
          <TouchableOpacity
            style={styles.textInputContainer}
            onPress={handleLocationClick}
          >
            <TextInput
              placeholder="Atlas, Bole, Addis Ababa"
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.textInput}
              editable={false} // This makes the TextInput clickable without showing the keyboard
            />
          </TouchableOpacity>
          <IconButton
            icon="plus"
            iconColor='#B80028'
            onPress={handleAddStopClick}
          />
        </View>
      </Appbar.Header>
    <ScrollView>
      <View style={styles.searchSection}>
        {/* You can add search functionality here */}
      </View>

      {filteredCars.map((car, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('DriverSearching', { carImageUri: car.imagePath });
          }}
        >
          <CarCard
            key={index}
            name={car.name}
            imagePath={car.imagePath}
            price={car.price}
            category={car.category}
            seats={car.seats}
            speed={car.speed}
            dropOffTime={car.dropOffTime}
            theme={index % 2 === 0 ? 'light' : 'dark'}
          />
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 5,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Gray background for the TextInput
    borderRadius: 5,
    justifyContent: 'center',
  },
  textInput: {
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
});

export default ListingScreen;
