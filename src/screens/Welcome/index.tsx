import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PhoneInput from '../../components/PhoneInput';
import Button from '../../components/Button';

// import cabImg from '../../assets/cab.png';
import cabImg from '../../assets/welcome.png';
import * as S from './styles';
import { StackParamsList } from '../../../types';

const Welcome: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();


  return (
    <S.BackgroundImage source={cabImg} resizeMode="cover">
    <S.Container>
      <StatusBar style="light" />
      <S.TopArea>
        {/* <S.CabImg source={cabImg} resizeMode="contain" /> */}
      </S.TopArea>
      <S.BottomArea>
        <S.Title>
          <S.Title>Welcome to </S.Title>
          <S.TitleBold>Luxury</S.TitleBold>
        </S.Title>
        <PhoneInput placeholder="987 65 43" />
        <S.GetStartedButton onPress={() => navigation.navigate('Verification')}>
          <S.ButtonText>Get Started</S.ButtonText>
        </S.GetStartedButton>
        
      </S.BottomArea>
    </S.Container>
    </S.BackgroundImage>
         
  );
};

export default Welcome;