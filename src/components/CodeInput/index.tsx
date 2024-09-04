import React, { forwardRef, RefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import * as S from './styles';

type CodeInputProps = TextInputProps;

const CodeInput = forwardRef<TextInput, CodeInputProps>((props, ref) => {
  return (
    <S.Container>
      <S.Input ref={ref as RefObject<TextInput>} keyboardType="numeric" maxLength={1} {...props} />
    </S.Container>
  );
});

export default CodeInput;
