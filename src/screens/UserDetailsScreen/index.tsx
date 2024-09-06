import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Card, Provider as PaperProvider, useTheme, HelperText } from 'react-native-paper';
import CustomButton from '../../newComponents/Button';
import { StackParamsList } from '../../../types';

const UserDetailsScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  const theme = useTheme();

  const handlePress = () => {
    if (!firstName || !lastName || !email) {
      setError('All fields are required');
    } else {
      setError('');
      navigation.navigate('DrawerNavigator');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.heading}>User Details</Text>
            <TextInput
              mode="outlined"
              label="First Name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.input}
              outlineColor="transparent"
              activeOutlineColor="transparent"
            />
            <TextInput
              mode="outlined"
              label="Last Name"
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
              outlineColor="transparent"
              activeOutlineColor="transparent"
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              style={styles.input}
              outlineColor="transparent"
              activeOutlineColor="transparent"
            />
            {error ? <HelperText type="error">{error}</HelperText> : null}
            <CustomButton title="Continue" onPress={handlePress} />
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 5,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 55,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#B80028',
  },
  input: {
    marginBottom: 16,
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

export default UserDetailsScreen;
