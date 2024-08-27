import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

interface RideHistoryCardProps {
    startLocation: string;
    destination: string;
    price: string;
    date: string;
}

const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ startLocation, destination, price, date }) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                
                <View style={styles.rowItem}>
                    <IconButton icon="map-marker" size={20} iconColor='#B80028'/>
                    <Text style={styles.text}>{startLocation}</Text>
                </View>
                
                {/* <View style={styles.row}>
                    <IconButton icon="map-marker-radius-outline" size={20} />
                    <Text style={styles.text}>Destination: {destination}</Text>
                </View>
                <View style={styles.rowItem}>
                        <IconButton icon="currency-usd" size={20} />
                        <Text style={styles.text}>Price: {price}</Text>
                    </View>
                <View style={styles.row}>
                    <IconButton icon="calendar" size={20} />
                    <Text style={styles.text}>Date: {date}</Text>
                </View> */}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        // marginBottom: 5,
        borderRadius: 10,
        textShadowColor:'#000',
        shadowOpacity:0.9,
        elevation: 3,
        padding: 5,
        margin:5,
        backgroundColor:'#ffffff'

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

        // marginBottom: 2, // Reduced gap between lines
    },
    rowCombined: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 2, // Reduced gap between lines
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
