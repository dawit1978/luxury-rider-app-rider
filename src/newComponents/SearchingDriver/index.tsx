import * as React from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { Card, Text, TextInput, IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const { height } = Dimensions.get('window'); // Get the window height

const SearchingDriver = () => {
  const [startLocation, setStartLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [locations, setLocations] = React.useState<string[]>([]);
  const [areInputsVisible, setAreInputsVisible] = React.useState(true);
  const progress = React.useRef(new Animated.Value(0)).current;
  const route = useRoute();
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
          source={{ uri: route?.params?.carImageUri }}
          style={styles.carImage}
          resizeMode="contain"
        />
        
        {/* Toggle Button for Collapsing/Expanding All Inputs */}
        <TouchableOpacity onPress={() => setAreInputsVisible(!areInputsVisible)}>
          <Text style={styles.dropdownTitle}>
            Add Stop {areInputsVisible ? '▲' : '▼'}
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
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    padding: 16,
  },
  cardContent: {
    flex: 1,
  },
  searchingText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#B80028',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B80028',
    marginBottom: 16,
  },
  carImage: {
    width: 200,    // adjust as necessary
    height: 100,   // adjust as necessary
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputContainerVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  plusIcon: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    elevation: 3,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B80028',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
});

export default SearchingDriver;
