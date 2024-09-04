import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import CodeInput from '../../components/CodeInput';
import FIcon from 'react-native-vector-icons/FontAwesome';

import envelopeImg from '../../assets/envelope.png';
import * as S from './styles';
import { StackParamsList } from '../../../types';

const VerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const codeRef2 = useRef<TextInput>(null);
  const codeRef3 = useRef<TextInput>(null);
  const codeRef4 = useRef<TextInput>(null);

  function focusNext(ref: React.RefObject<TextInput | null>) {
    ref.current?.focus();
  }

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
          <S.Description>
            Please type the verification code sent to
          </S.Description>
          <S.Description bold> +251 555 66 77</S.Description>
        </S.Description>
        <S.CodeContainer>
          <CodeInput onChangeText={() => focusNext(codeRef2)} autoFocus />
          <CodeInput onChangeText={() => focusNext(codeRef3)} ref={codeRef2} />
          <CodeInput onChangeText={() => focusNext(codeRef4)} ref={codeRef3} />
          <CodeInput
            returnKeyType="send"
            onChangeText={() => navigation.navigate('UserDetails')}
            onSubmitEditing={() => navigation.navigate('UserDetails')}
            ref={codeRef4}
          />
        </S.CodeContainer>
      </S.InnerContainer>
    </S.Container>
  );
};

export default VerificationScreen;
