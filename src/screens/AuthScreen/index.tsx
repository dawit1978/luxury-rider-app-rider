// src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import CustomButton from '../../newComponents/Button';
import { Image } from 'react-native';
import { StackParamsList } from '../../../types';

type AuthScreenProps = {
  navigation: NavigationProp<any>;
};

const AuthScreen: React.FC<AuthScreenProps> = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [country, setCountry] = useState<Country | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  const handlePress = () => {
    navigation.navigate('Verification');
  };

  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setVisible(false);  // Close the country picker after selection
  };

  return (
    <View style={styles.container}>
      {/* <Card.Cover source={require('../../../assets/icon2.png')} style={styles.image} /> */}
      <View style={styles.formContainer}>
        <Image source={require('../../../assets/icon2.png')} style={styles.image} />
        <Text style={styles.heading}>Earn Luxuryum on every trip</Text>
      </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setVisible(true)}
          >
            <CountryPicker
              countryCode={countryCode}
              withFlag={true}
              withFilter={true}
              withCallingCode={true}
              visible={visible}
              onClose={() => setVisible(false)}
              onSelect={handleSelectCountry}
              containerButtonStyle={styles.countryPicker}
            />
            <IconButton
              icon="chevron-down"
              size={24}
              iconColor="#B80028"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <TextInput
            mode="outlined"
            // placeholder="Please enter a mobile number"
            // left={<TextInput.Icon name="phone" />
            keyboardType="numeric"
            placeholder="987 65 43"
            style={styles.input}
            outlineColor="transparent"
            activeOutlineColor="transparent"
          />
        </View>
        <CustomButton title="Continue" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    height:105,
    width:100,
    alignSelf:"center",
    marginBottom:210,
    marginTop:170,

    // borderRadius:0,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B80028',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal:10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: -10,
  },
  input: {
    flex: 1,
    // marginLeft: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    marginTop: 20,
    backgroundColor: '#B80028',
  },
});

export default AuthScreen;
