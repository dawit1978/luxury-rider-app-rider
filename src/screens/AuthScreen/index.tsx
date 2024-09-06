import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Text, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import CustomButton from '../../newComponents/Button';
import { Image } from 'react-native';
import { StackParamsList } from '../../../types';

type AuthScreenProps = {
  navigation?: NavigationProp<any>;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [country, setCountry] = useState<Country | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  const nav = navigation || useNavigation<NavigationProp<StackParamsList>>();

  const generateOTP = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
  };

  const handlePress = () => {
    const otp = generateOTP();
    Alert.alert('OTP Sent', `Phone: ${phoneNumber}, OTP: ${otp}`);
    nav.navigate('Verification', { phoneNumber, otp }); // Pass OTP to verification screen
  };

  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setVisible(false); // Close the country picker after selection
  };

  return (
    <View style={styles.container}>
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
          keyboardType="numeric"
          placeholder="987 65 43"
          style={styles.input}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
    height: 105,
    width: 100,
    alignSelf: 'center',
    marginBottom: 210,
    marginTop: 170,
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
    paddingHorizontal: 10,
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
