import React, { useRef, useState, useEffect } from 'react';
import { TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, useNavigation, RouteProp } from '@react-navigation/native';
import CodeInput from '../../components/CodeInput';
import FIcon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import { StackParamsList } from '../../../types';

type VerificationScreenProps = {
  route: RouteProp<StackParamsList, 'Verification'>;
};

const VerificationScreen: React.FC<VerificationScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  const { phoneNumber, otp } = route.params; // Get phoneNumber and OTP from route params

  const [enteredOTP, setEnteredOTP] = useState(['', '', '', '']); // Array to hold the OTP input for 4 fields

  const codeRef2 = useRef<TextInput>(null);
  const codeRef3 = useRef<TextInput>(null);
  const codeRef4 = useRef<TextInput>(null);

  function focusNext(ref: React.RefObject<TextInput | null>) {
    ref.current?.focus();
  }

  // Automatically verify OTP and navigate when all digits are entered
  useEffect(() => {
    const fullEnteredOTP = enteredOTP.join('');
    if (fullEnteredOTP.length === 4) {
      if (fullEnteredOTP === otp) {
        Alert.alert('Success', 'OTP Verified');
        navigation.navigate('UserDetails');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    }
  }, [enteredOTP]);

  const handleOTPChange = (index: number, value: string) => {
    const newOTP = [...enteredOTP];
    newOTP[index] = value;
    setEnteredOTP(newOTP);

    // Automatically focus the next input if it's not the last one
    if (value.length === 1) {
      if (index === 0) focusNext(codeRef2);
      if (index === 1) focusNext(codeRef3);
      if (index === 2) focusNext(codeRef4);
    }
  };

  return (
    <S.Container>
      <S.InnerContainer>
        <StatusBar style="dark" />
        <S.IconContainer>
          <FIcon name="envelope-o" color={"white"} size={90} />
        </S.IconContainer>
        <S.Title>
          <S.Title>Verification </S.Title>
          <S.Title bold>Code</S.Title>
        </S.Title>
        <S.Description>
          Please type the verification code sent to {phoneNumber}
        </S.Description>
        <S.CodeContainer>
          <CodeInput 
            onChangeText={(value) => handleOTPChange(0, value)} 
            autoFocus 
            maxLength={1}
            keyboardType="numeric"
          />
          <CodeInput 
            onChangeText={(value) => handleOTPChange(1, value)} 
            ref={codeRef2} 
            maxLength={1}
            keyboardType="numeric"
          />
          <CodeInput 
            onChangeText={(value) => handleOTPChange(2, value)} 
            ref={codeRef3} 
            maxLength={1}
            keyboardType="numeric"
          />
          <CodeInput
            onChangeText={(value) => handleOTPChange(3, value)} 
            ref={codeRef4}
            maxLength={1}
            keyboardType="numeric"
          />
        </S.CodeContainer>
      </S.InnerContainer>
    </S.Container>
  );
};

export default VerificationScreen;
