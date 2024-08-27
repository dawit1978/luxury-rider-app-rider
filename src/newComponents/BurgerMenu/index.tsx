import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface BurgerMenuProps {
    top?: number;
    left?: number;
    position?: 'absolute' | 'relative';
    zIndex?: number;
    containerStyle?: ViewStyle;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
    top = 40,
    left = 20,
    position = 'absolute',
    zIndex = 1,
    containerStyle,
}) => {
    const navigation = useNavigation();

    return (
        <View
            style={[
                styles.menuContainer,
                { top, left, position, zIndex },
                containerStyle,
            ]}
        >
            <IconButton
                icon="menu"
                size={24}
                color="black"
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
