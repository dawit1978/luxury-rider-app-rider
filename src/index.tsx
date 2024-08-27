import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import theme from './theme';

import Welcome from './screens/Welcome';
import Verification from './screens/Verification';
import AddCard from './screens/AddCard';
import CurrentLocation from './screens/CurrentLocation';
import SelectDestination from './screens/SelectDestination';
import Request from './screens/Request';
import YourRide from './screens/YourRide';
import DrawerNavigator from './navigation/DrawerNavigator';
import VerificationScreen from './screens/VerificationScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import AuthScreen from './screens/AuthScreen';
import ListingScreen from './screens/ListingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import DriverSearchingScreen from './screens/DriverSearchingScreen';
import DriverFoundScreen from './screens/DriverFound';
import SearchingDriver from './newComponents/SearchingDriver';

const Stack = createStackNavigator();

const Index: React.FC = () => {
  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          {/* <DriverSearchingScreen /> */}
          {/* <DriverFoundScreen /> */}
          {/* <Request /> */}
          {/* <SearchingDriver /> */}
        
          <Stack.Navigator initialRouteName='AuthScreen' screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name='DrawerNavigator'component={DrawerNavigator} />
            <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
            <Stack.Screen name="SelectDestination"component={SelectDestination}/>
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="YourRide" component={YourRide} />  */}
          {/* <Stack.Screen name="SearchingDriver" component={DriverSearchingScreen} /> */}

                 <Stack.Screen name="MapScreen" component={MapScreen} /> 
                 {/* <Stack.Screen name="ListingScreen" component={ListingScreen} />  */}
            

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default Index;




































// import * as React from 'react';
// import { StyleSheet, View, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
// import { Appbar, Card, Divider, Text } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import BackButton from '../../newComponents/BackButton';
// import Search from '../../newComponents/Search';
// import CarCard from '../../newComponents/CarCard';

// import tesla from '../../assets/cars/tesla.png';
// import mercedes from '../../assets/cars/mercedes.png';
// import rangeRover from '../../assets/cars/range-rover.png';
// import landCruiser from '../../assets/cars/land-cruiser.png';

// type carDetailType= {
//      name:string;
//      imagePath:ImageSourcePropType;
//      price:string;
//      category: 'VIP'|'VVIP'|'Corporate';
//      seats: number;
//      speed: string;
//      dropOffTime: string; // Added drop-off time
// }

// const ListingScreen = () => {
//   const [selectedFilter, setSelectedFilter] = React.useState('All');
//   const navigation = useNavigation();

//   const carsData: Array<carDetailType> = [
//     {
//       name: 'MINI SUV',
//       imagePath: rangeRover,
//       price: '10,000 birr/day',
//       category: 'VVIP',
//       seats: 4,
//       speed: '100 mph',
//       dropOffTime: '2:00', // Example drop-off time
//     },
//     {
//       name: 'SUV',
//       imagePath: mercedes,
//       price: '10,000 birr/day',
//       category: 'VVIP',
//       seats: 4,
//       speed: '100 mph',
//       dropOffTime: '2:00', // Example drop-off time
//     },
//     {
//       name: 'SEDAN',
//       imagePath: landCruiser,
//       price: '10,000 birr/day',
//       category: 'VIP',
//       seats: 4,
//       speed: '100 mph',
//       dropOffTime: '2:00', // Example drop-off time
//     },
//   ];

//   const filteredCars = selectedFilter === 'All'
//     ? carsData
//     : carsData.filter(car => car.category === selectedFilter);

//   return (
//     <View style={styles.container}>
//       <Appbar.Header>
//         <BackButton />
//         <Appbar.Content title="Atlas, Bole, Addis Ababa" style={{ marginLeft: 26 }} />
//       </Appbar.Header>

//       <View>
//         <View style={styles.searchSection}>
//          {/* <Search />
//            <View style={styles.filterTabs}>
//             <Card style={[styles.filterCard, selectedFilter === 'All' && styles.selectedCard]}>
//               <TouchableOpacity onPress={() => setSelectedFilter('All')}>
//                 <Text style={styles.filterText}>All</Text>
//               </TouchableOpacity>
//             </Card>
            
//             <Divider style={styles.verticalDivider} />
            
//             <Card style={[styles.filterCard, selectedFilter === 'VIP' && styles.selectedCard]}>
//               <TouchableOpacity onPress={() => setSelectedFilter('VIP')}>
//                 <Text style={styles.filterText}>VIP</Text>
//               </TouchableOpacity>
//             </Card>
            
//             <Divider style={styles.verticalDivider} />
            
//             <Card style={[styles.filterCard, selectedFilter === 'VVIP' && styles.selectedCard]}>
//               <TouchableOpacity onPress={() => setSelectedFilter('VVIP')}>
//                 <Text style={styles.filterText}>VVIP</Text>
//               </TouchableOpacity>
//             </Card>
//           </View> */}
//         </View>

//         {filteredCars.map((car, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => {
//               navigation.navigate('CarDescription', { car });
//             }}
//           >
//             <CarCard
//               key={index}
//               name={car.name}
//               imagePath={car.imagePath}
//               price={car.price}
//               category={car.category}
//               seats={car.seats}
//               speed={car.speed}
//               dropOffTime={car.dropOffTime} // Pass drop-off time
//               theme={index % 2 === 0 ? 'light' : 'dark'} // Alternate themes
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   searchSection: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   filterTabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 8,
//     backgroundColor: 'white',
//     elevation: 4,
//     borderRadius: 8,
//     padding: 4,
//   },
//   filterCard: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 8,
//     borderRadius: 4,
//     elevation: 4,
//     backgroundColor: 'white',
//   },
//   selectedCard: {
//     backgroundColor: '#B80028',
//   },
//   filterText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   verticalDivider: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#D3D3D3',
//   },
// });

// export default ListingScreen;






// import React, { useState, useEffect } from 'react';
// import { Alert } from 'react-native';

// import { View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { Card, TextInput, IconButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import BurgerMenu from '../../newComponents/BurgerMenu'; // Adjust the path as necessary
// import MapButton from '../../components/MapButton';
// import iconCenter from '../../assets/map_center.png';
// import whereCar from '../../assets/icons/whereCar.png';
// import services from '../../assets/icons/services.png';
// import RideHistoryCard from '../../newComponents/RideHistoryCard'; // Adjust the path as necessary
// interface ILatLng {
//     latitude: number;
//     longitude: number;
//   }

// const MapScreen: React.FC = () => {
//     const [phase, setPhase] = useState<number>(1);
//     const [startLocation, setStartLocation] = useState<string>('');
//     const [destination, setDestination] = useState<string>('');
//     const [locations, setLocations] = useState<string[]>([]);
//     const navigation = useNavigation();

//     const [latLng, setLatLng] = useState<ILatLng>({
//         latitude: 8.9831,
//         longitude: 38.8101,
//       });

//       let mapRef: MapView | null = null;
//       useEffect(() => {
//         navigator.geolocation?.getCurrentPosition(
//           ({ coords: { latitude, longitude } }) => {
//             setLatLng({ latitude, longitude });
//           },
//           () => {
//             Alert.alert('Error', 'Failed to get your current location');
//           },
//           {
//             timeout: 2000,
//             enableHighAccuracy: true,
//             maximumAge: 1000,
//           },
//         );
//       }, []);
    



//     const handleAddStop = () => {
//         setLocations([...locations, '']);
//     };
//     function centerMap() {
//         mapRef?.animateToRegion(
//           {
//             ...latLng,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           },
//           1000,
//         );
//       }

//     return (
//         <KeyboardAvoidingView style={styles.container}>

//             <MapView
//             ref={map => {
//                 mapRef = map;
//               }}
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 initialRegion={{
//                     latitude: 8.9831,
//                     longitude: 38.8101,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             >
//                 <Marker coordinate={latLng} />
//             </MapView>
//             {/* <BurgerMenu /> */}
//             <MapButton style={styles.locationIcon} icon={iconCenter} noMargin onPress={centerMap} />
//             <View style={[styles.panel, phase > 1 && styles.panelExpanded]}>
//                 <ScrollView contentContainerStyle={styles.scrollViewContent}>
//                     {phase === 1 ? (
//                         <View style={styles.inputContainerHorizontal}>
//                             <Image
//                                 source={whereCar}
//                                 style={styles.carImage}
//                                 />
//                             <TextInput
//                                 placeholder="Where to..."
//                                 style={styles.inputHorizontal}
//                                 onFocus={() => setPhase(2)}
//                                 />
//                             <TouchableOpacity
//                             onPress={() => navigation.navigate('TabBarNavigator')}
//                             >
//                                 <Image
//                                   source={services}
//                                   style={styles.servicesIcon}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.inputContainerVertical}>
//                             <Card style={styles.inputCard}>
//                                 <TextInput
//                                     label="Start"
//                                     placeholder="Start"
//                                     value={startLocation}
//                                     onChangeText={setStartLocation}
//                                     style={styles.input}
//                                 />
//                             </Card>
//                             {locations.map((location, index) => (
//                                 <Card key={index} style={styles.inputCard}>
//                                     <TextInput
//                                         label={`Stop ${index + 1}`}
//                                         placeholder={`Stop ${index + 1}`}
//                                         value={location}
//                                         onChangeText={(text) => {
//                                             const newLocations = [...locations];
//                                             newLocations[index] = text;
//                                             setLocations(newLocations);
//                                         }}
//                                         style={styles.input}
//                                     />
//                                 </Card>
//                             ))}
//                             <TouchableOpacity style={styles.plusIconContainer}>
//                                 <IconButton
//                                     icon="plus"
//                                     size={24}
//                                     iconColor='#B80028'
//                                     onPress={handleAddStop}
//                                     style={styles.plusIcon}
//                                 />
//                             </TouchableOpacity>
//                             <Card style={styles.inputCard}>
//                                 <TextInput
//                                     label="Destination"
//                                     placeholder="Destination"
//                                     value={destination}
//                                     onChangeText={setDestination}
//                                     style={styles.input}
//                                 />
//                             </Card>
//                         </View>
//                     )}
                
//                             <TouchableOpacity style={styles.carIconContainer} >
//                                 <IconButton
//                                     icon="car"
//                                     size={24}
//                                     iconColor='#B80028'
//                                     onPress={()=>{navigation.navigate('ListingScreen')}}
//                                     style={styles.plusIcon}
//                                 />
//                             </TouchableOpacity>
//                     {(phase === 2 || phase === 3) && (
//                         <View style={styles.historyContainer}>
//                             <View style={styles.historyContent}>
//                                 <RideHistoryCard 
//                                     startLocation="Bole, Addis Ababa, Ethiopia" 
//                                     destination="Skylight Hotel" 
//                                     price="2000birr" 
//                                     date="2024-08-01" 
//                                 />
//                                 <RideHistoryCard 
//                                     startLocation="Iebu, Addis Ababa, Ethiopia" 
//                                     destination="Hilton Hotel" 
//                                     price="1500birr" 
//                                     date="2024-07-30" 
//                                 />
//                                 <RideHistoryCard 
//                                     startLocation="Piyasa, Addis Ababa, Ethiopia" 
//                                     destination="Skylight Hotel" 
//                                     price="birr1800" 
//                                     date="2024-07-28" 
//                                 />
//                             </View>
//                         </View>
//                     )}
//                 </ScrollView>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center"
//     },
//     map: {
//         // flex: 8,
//         // marginTop:150
//         width: "100%",
//         height: "100%",
//     },
//     panel: {
//         position:"absolute",
//         // flex: 2, // Adjusted to allow growth
//         // margin: 10,
//         // padding: 10,
//         backgroundColor: 'white',
//         // marginTop:100,
//         bottom:5,
//         height:90,
//         width:"90%",
//         borderRadius: 10,
//         elevation: 3,
//         zIndex:2
//     },
//     panelExpanded: {
//         // flex: 8, // Increase the height when expanded
//         height: 400
//     },
//     scrollViewContent: {
//         flexGrow: 1,
//     },
//     inputContainerHorizontal: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//         borderColor:"#f0f0f0",
//         borderWidth:2,
//         borderRadius: 10,
//         padding: 10,
//     },
//     inputContainerVertical: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start', // Adjusted to align items at the top
//         padding: 20,
//         position: 'relative',
//     },
//     carImage: {
//         width: 36,
//         height: 34,
//         marginRight: 10,
//         // backgroundColor:'black'
//     },
//     servicesIcon: {
//         width: 24,
//         height: 24,
//         marginRight: 10,
//         // backgroundColor:'black'
//     },
//     inputHorizontal: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         color:'#B80028',
//         borderRadius: 10,
//         marginRight: 10,
//     },
//     input: {
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         width: '100%',
//     },
//     inputCard: {
//         width: '100%',
//         marginBottom: 5,
//         borderRadius: 10,
//         elevation: 3,
//         padding: 5,
//     },
//     servicesButton: {
//         marginLeft: 10,
//     },
//     plusIconContainer: {
//         position: 'absolute',
//         right: 0,
//         top: 10,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 50,
//         padding: 5,
//     },
//     carIconContainer: {
//         position: 'absolute',
//         alignSelf:'center',
//         // right: 10,
//         top: 0,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 50,
//         // padding: 5,
//     },
//     plusIcon: {
//         margin: 0,
//     },
//     historyContainer: {
//         flex: 1,
//         padding: 10,
//     },
//     historyContent: {
//         flexGrow: 1,
//         justifyContent: 'center',
//     },
//     locationIcon:{
//         // position: "absolute",
//         // zIndex:1,
//         // bottom: 180
//         // alignSelf:"center"
//         // flexDirection: "row",
//         // justifyContent: "space-between",
//         // // bottom: 110,
//         // // width: "80%",
//         // height: 50,
//     }
// });

// export default MapScreen;
