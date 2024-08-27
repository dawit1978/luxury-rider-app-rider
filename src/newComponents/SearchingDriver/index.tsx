import * as React from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { Card, Text, TextInput, IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const { height } = Dimensions.get('window'); // Get the window height

const SearchingDriver = () => {
  const [startLocation, setStartLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [locations, setLocations] = React.useState<string[]>([]);
  const [areInputsVisible, setAreInputsVisible] = React.useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const carImageUri = route?.params?.carImageUri;
  const focusInput = route?.params?.focusInput;

  React.useEffect(() => {
    if (focusInput === 'start') {
      // Handle logic for focusing start input
    } else if (focusInput === 'plus') {
      handleAddStop(); 
    }
  }, [focusInput]);

  React.useEffect(() => {
    animateProgress();
  }, []);

  const animateProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,  // Time duration for each progress cycle
      easing: Easing.linear, // Smooth transition
      useNativeDriver: false,
    }).start(() => animateProgress());
  };

  const handleAddStop = () => {
    if (locations.length < 3) {
      setLocations([...locations, '']);
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.searchingText}>Please wait Nearby driver to confirm....</Text>
      <View style={styles.cardContent}>
        {/* Animated Progress Bar */}
        <Animated.View style={[styles.progressBar, { width: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '100%'],
        })}]} />

        <Image
          source={carImageUri}
          style={styles.carImage}
          resizeMode="contain"
        />
        
        {/* Toggle Button for Collapsing/Expanding All Inputs */}
        <TouchableOpacity onPress={() => setAreInputsVisible(!areInputsVisible)}>
          <Text style={styles.dropdownTitle}>
            Add Stop {areInputsVisible ? '-' : '+'}
          </Text>
        </TouchableOpacity>

        {/* Collapsible Section for Inputs */}
        {areInputsVisible && (
          <View style={styles.inputContainerVertical}>
            <Card style={styles.inputCard}>
              <TextInput
                label="Start" 
                placeholder="Enter start location"
                value={startLocation}
                onChangeText={(text) => setStartLocation(text)}
                style={styles.input}
              />
            </Card>

            {locations.map((location, index) => (
              <Card key={index} style={styles.inputCard}>
                <TextInput
                  label={`Stop ${index + 1}`}
                  placeholder={`Enter stop ${index + 1}`}
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
                iconColor="#B80028"
                onPress={handleAddStop}
                style={styles.plusIcon}
              />
            )}

            <Card style={styles.inputCard}>
              <TextInput
                label="Destination"
                placeholder="Enter destination"
                value={destination}
                onChangeText={(text) => setDestination(text)}
                style={styles.input}
              />
            </Card>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // margin: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  searchingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  carImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#B80028',
    marginBottom: 20,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#B80028',
    textAlign: 'center',
  },
  inputContainerVertical: {
    width: '100%',
    alignItems: 'center',
  },
  inputCard: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  plusIcon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default SearchingDriver;
