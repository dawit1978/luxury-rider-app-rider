import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface BurgerMenuProps {
  style?: ViewStyle;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ style }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.menuContainer, style]}>
      <IconButton
        icon="menu"
        size={24}
        iconColor="#B80028"
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    margin: 0,
  },
});

export default BurgerMenu;
