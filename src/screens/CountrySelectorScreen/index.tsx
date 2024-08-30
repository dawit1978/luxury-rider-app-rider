import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, IconButton, Card } from 'react-native-paper';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import CustomButton from '../../newComponents/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackParamsList } from '../../../types';
import { LogBox } from 'react-native';

const CountrySelectorScreen: React.FC = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('ET');
  const [country, setCountry] = useState<Country | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  LogBox.ignoreLogs([
    'Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release.',
  ]);
  const handlePress = useCallback(() => {
    navigation.navigate('Verification');
  }, [navigation]);

  const handleCountrySelect = useCallback((selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  }, []);

  const countryPicker = useMemo(
    () => (
      <CountryPicker
        countryCode={countryCode}
        withFlag
        withFilter
        withCallingCode
        onSelect={handleCountrySelect}
        containerButtonStyle={styles.countryPicker}
      />
    ),
    [countryCode, handleCountrySelect]
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Card style={styles.countryCard}>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {/* Action on press if needed */}}
          >
            {countryPicker}
            <IconButton
              icon="chevron-down"
              size={24}
              iconColor="#FFFFFF"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </Card>
        <TextInput
          mode="outlined"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
        />
      </View>
      <CustomButton title="Continue" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#B80028',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  countryCard: {
    backgroundColor: 'transparent',
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
    marginLeft: 10,
    backgroundColor: '#fff',
    elevation: 2,
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

export default CountrySelectorScreen;
