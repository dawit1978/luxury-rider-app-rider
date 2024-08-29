// src/screens/WhereToScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, TextInput, IconButton } from 'react-native-paper';
import { NavigationProp, RouteProp, useNavigation,useRoute, } from '@react-navigation/native';
import RideHistoryCard from '../../newComponents/RideHistoryCard';
import CustomButton from '../../newComponents/Button';
import { DrawerParamsList } from '../../../types';

type WhereToScreenRouteProp = RouteProp<DrawerParamsList, 'WhereToScreen'>;
interface Props {
  route: WhereToScreenRouteProp;
} 

const WhereToScreen: React.FC <Props>= () => {
  const route = useRoute<WhereToScreenRouteProp>();
  // const { focusInput } = route.params;

  const [startLocation, setStartLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([]);

  const navigation = useNavigation<NavigationProp<DrawerParamsList>>();

  const handleAddStop = () => {
    if (locations.length < 3) {
      setLocations([...locations, '']);
    }
  };

  const handleDone = () => {
    // Handle completion, e.g., navigate back or save data
    navigation.navigate('ListingScreen'); // Navigate back toListing screen after completion
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainerVertical}>
        <Card style={styles.inputCard}>
          <TextInput
            label="Start"
            placeholder="Start"
            value={startLocation}
            onChangeText={(text) => setStartLocation(text)}
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
          <IconButton
            icon="plus"
            size={24}
            iconColor="#ffffff"
            onPress={handleAddStop}
            style={styles.plusIcon}
          />
        )}
        <Card style={styles.inputCard}>
          <TextInput
            label="Destination"
            placeholder="Destination"
            value={destination}
            onChangeText={(text) => setDestination(text)}
            style={styles.input}
          />
        </Card>
      </View>
      <ScrollView style={styles.historyScroll}>
        <RideHistoryCard
          startLocation="Bole, Addis Ababa, Ethiopia"
          destination="Skylight Hotel"
          price="2000birr"
          date="2024-08-01"
        />
         <RideHistoryCard
          startLocation="piassa, Addis Ababa, Ethiopia"
          destination="Skylight Hotel"
          price="2000birr"
          date="2024-08-01"
        /> 
            <RideHistoryCard
            startLocation="megenagna, Addis Ababa, Ethiopia"
            destination="Skylight Hotel"
            price="2000birr"
            date="2024-08-01"
        /> 
        <RideHistoryCard
        startLocation="lebu, Addis Ababa, Ethiopia"
        destination="Skylight Hotel"
        price="2000birr"
        date="2024-08-01"
        /> 
        <RideHistoryCard
        startLocation="jemo, Addis Ababa, Ethiopia"
        destination="Skylight Hotel"
        price="2000birr"
        date="2024-08-01"
    /> 
    <RideHistoryCard
    startLocation="asco, Addis Ababa, Ethiopia"
    destination="Skylight Hotel"
    price="2000birr"
    date="2024-08-01"
    /><RideHistoryCard
    startLocation="kera, Addis Ababa, Ethiopia"
    destination="Skylight Hotel"
    price="2000birr"
    date="2024-08-01"
    /><RideHistoryCard
    startLocation="Bole, Addis Ababa, Ethiopia"
    destination="Skylight Hotel"
    price="2000birr"
    date="2024-08-01"
    /><RideHistoryCard
    startLocation="Bole, Addis Ababa, Ethiopia"
    destination="Skylight Hotel"
    price="2000birr"
    date="2024-08-01"
    />
        {/* Add more RideHistoryCard components as needed */}
      </ScrollView>
      {(startLocation && destination) && (
        <CustomButton title='Done' onPress={handleDone} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainerVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:80,

  },
  inputCard: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    padding: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
  },
  plusIcon: {
    alignSelf: 'flex-end',
    backgroundColor: '#B80028',
    borderRadius: 50,
    padding: 5,
  },
  historyScroll: {
    flex: 1,
    marginTop: 10,
  },
});

export default WhereToScreen;
