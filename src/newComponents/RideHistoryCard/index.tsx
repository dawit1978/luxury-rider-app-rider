// src/newComponents/RideHistoryCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamsList } from '../../../types';

interface RideHistoryCardProps {
    startLocation: string;
    destination: string;
    price: string;
    date: string;
    stops?: string[];
}

const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ startLocation, destination, price, date, stops = [] }) => {
    const navigation = useNavigation<NavigationProp<DrawerParamsList>>();

    const handlePress = () => {
        navigation.navigate('RideHistoryDetails', { startLocation, destination, date, stops });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.rowItem}>
                        <IconButton icon="map-marker" size={20} iconColor='#B80028' />
                        <Text style={styles.text}>{startLocation}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        shadowOpacity: 0.9,
        elevation: 3,
        padding: 5,
        margin: 5,
        backgroundColor: '#ffffff',
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default RideHistoryCard;
