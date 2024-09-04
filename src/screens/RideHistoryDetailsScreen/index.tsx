import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton, Button, TextInput } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamsList } from '../../../types';
import CustomButton from '../../newComponents/Button';
import BackButton from '../../newComponents/BackButton';

interface RideHistoryDetailsScreenProps {
    route: {
        params: {
            startLocation: string;
            destination: string;
            stops: string[];
        };
    };
}

const RideHistoryDetailsScreen: React.FC<RideHistoryDetailsScreenProps> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<DrawerParamsList>>();
    const { startLocation, destination, stops } = route.params;

    const [expanded, setExpanded] = useState<boolean>(true);
    const [newStops, setNewStops] = useState<string[]>(stops);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleAddStop = () => {
        if (newStops.length < 3) {
            setNewStops([...newStops, '']);
        }
    };

    const handleStopChange = (text: string, index: number) => {
        const updatedStops = [...newStops];
        updatedStops[index] = text;
        setNewStops(updatedStops);
    };

    const handleConfirm = () => {
        navigation.navigate('ListingScreen');
    };

    return (
        <View style={styles.container}>
            <BackButton />
        <ScrollView >
            <Card style={styles.card}>
                <Card.Title
                    title="Ride Details"
                    right={() => (
                        <IconButton
                            icon={expanded ? 'chevron-up' : 'chevron-down'}
                            onPress={toggleExpand}
                        />
                    )}
                />
                {expanded && (
                    <Card.Content>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Start:</Text>
                            <Text style={styles.value}>{startLocation}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Destination:</Text>
                            <Text style={styles.value}>{destination}</Text>
                        </View>
                        {newStops.map((stop, index) => (
                            <View key={index} style={styles.stopContainer}>
                                <TextInput
                                    label={`Stop ${index + 1}`}
                                    value={stop}
                                    onChangeText={(text) => handleStopChange(text, index)}
                                    style={styles.input}
                                />
                            </View>
                        ))}
                        {newStops.length < 3 && (
                            <Button
                                icon="plus"
                                mode="contained"
                                onPress={handleAddStop}
                                style={styles.addButton}
                            >
                                Add Stop
                            </Button>
                        )}
                    </Card.Content>
                )}
            </Card>
            <CustomButton title="Confirm" onPress={handleConfirm} />
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop:40
    },
    card: {
        marginBottom: 10,
        borderRadius: 10,
        elevation: 5,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        marginLeft: 10,
    },
    stopContainer: {
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    addButton: {
        marginTop: 20,
    },
    confirmButton: {
        marginTop: 30,
        backgroundColor: '#B80028',
    },
});

export default RideHistoryDetailsScreen;
