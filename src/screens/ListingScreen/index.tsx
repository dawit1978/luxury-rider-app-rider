import * as React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Appbar, Card, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../newComponents/BackButton';
import Search from '../../newComponents/Search';
import CarCard from '../../newComponents/CarCard';

import tesla from '../../assets/cars/tesla.png';
import mercedes from '../../assets/cars/mercedes.png';
import rangeRover from '../../assets/cars/range-rover.png';
import landCruiser from '../../assets/cars/land-cruiser.png';

type carDetailType= {
     name:string;
     imagePath:ImageSourcePropType;
     price:string;
     category: 'VIP'|'VVIP'|'Corporate';
     seats: number;
     speed: string;
     dropOffTime: string; // Added drop-off time
}

const ListingScreen = () => {
  const [selectedFilter, setSelectedFilter] = React.useState('All');
  const navigation = useNavigation();

  const carsData: Array<carDetailType> = [
    {
      name: 'MINI SUV',
      imagePath: rangeRover,
      price: '10,000 birr/day',
      category: 'VVIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00', // Example drop-off time
    },
    {
      name: 'SUV',
      imagePath: mercedes,
      price: '10,000 birr/day',
      category: 'VVIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00', // Example drop-off time
    },
    {
      name: 'SEDAN',
      imagePath: landCruiser,
      price: '10,000 birr/day',
      category: 'VIP',
      seats: 4,
      speed: '100 mph',
      dropOffTime: '2:00', // Example drop-off time
    },
  ];

  const filteredCars = selectedFilter === 'All'
    ? carsData
    : carsData.filter(car => car.category === selectedFilter);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <BackButton />
        <Appbar.Content title="Atlas, Bole, Addis Ababa" style={{ marginLeft: 26 }} />
      </Appbar.Header>

      <View>
        <View style={styles.searchSection}>
          <Search />
          {/* <View style={styles.filterTabs}>
            <Card style={[styles.filterCard, selectedFilter === 'All' && styles.selectedCard]}>
              <TouchableOpacity onPress={() => setSelectedFilter('All')}>
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>
            </Card>
            
            <Divider style={styles.verticalDivider} />
            
            <Card style={[styles.filterCard, selectedFilter === 'VIP' && styles.selectedCard]}>
              <TouchableOpacity onPress={() => setSelectedFilter('VIP')}>
                <Text style={styles.filterText}>VIP</Text>
              </TouchableOpacity>
            </Card>
            
            <Divider style={styles.verticalDivider} />
            
            <Card style={[styles.filterCard, selectedFilter === 'VVIP' && styles.selectedCard]}>
              <TouchableOpacity onPress={() => setSelectedFilter('VVIP')}>
                <Text style={styles.filterText}>VVIP</Text>
              </TouchableOpacity>
            </Card>
          </View> */}
        </View>

        {filteredCars.map((car, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('CarDescription', { car });
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
              dropOffTime={car.dropOffTime} // Pass drop-off time
              theme={index % 2 === 0 ? 'light' : 'dark'} // Alternate themes
            />
          </TouchableOpacity>
        ))}
      </View>
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
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 8,
    padding: 4,
  },
  filterCard: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
  },
  selectedCard: {
    backgroundColor: '#B80028',
  },
  filterText: {
    fontSize: 16,
    color: 'black',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D3D3D3',
  },
});

export default ListingScreen;
