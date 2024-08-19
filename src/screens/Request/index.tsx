import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, BackHandler, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Polyline, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Checkbox, IconButton, TextInput } from 'react-native-paper';
import homeMarker from '../../assets/home_marker.png';
import destMarker from '../../assets/dest_marker.png';
import customMapStyle from '../../mapstyle.json';
import BackButton from '../../newComponents/BackButton';
import CustomButton from '../../newComponents/Button';
import * as S from './styles';
import CallDriverCard from '../../newComponents/CallDriverCard';
import DriverCard from '../../newComponents/DriverCard';
import driverImage from '../../assets/avatar.png';

const Request: React.FC = () => {
  const [selected, setSelected] = useState('economy');
  const [text, setText] = useState(' ');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandAnim] = useState(new Animated.Value(0));
  const [reasons, setReasons] = useState<string[]>([]); // Added state for reasons

  const navigation = useNavigation();

  const handleCallDriver = () => {
    navigation.navigate('YourRide');
    console.log('Call Driver button pressed');
  };

  const handleCancelRide = () => {
    setIsModalVisible(true);
  };

  const handleConfirmCancel = () => {
    console.log('Cancel Ride confirmed with reasons:', reasons);
    setIsModalVisible(false);
    navigation.navigate('ListingScreen');
  };

  const toggleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(expandAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleReason = (reason: string) => {
    if (reasons.includes(reason)) {
      setReasons(reasons.filter(r => r !== reason));
    } else {
      setReasons([...reasons, reason]);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      setIsModalVisible(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const expandHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 200],
  });

  return (
    <S.Container style={{ marginTop: 20 }}>
      <S.HeaderContainer>
        <BackButton onPress={() => navigation.goBack()} />
      </S.HeaderContainer>

      <S.CreditCardInfo>
        <DriverCard
          name="Abel Kassa"
          vehicleRegistration="DL3s - 2655"
          imagePath={driverImage}
        />

        <Animated.View style={{ height: expandHeight, overflow: 'hidden' }}>
          {isExpanded && (
            <CallDriverCard
              estimatedTime="10-15"
              date="04 Apr 2022"
              startLocation="Piassa"
              endLocation="Bole road 10"
            />
          )}
        </Animated.View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Call Driver"
            icon="phone-in-talk-outline"
            onPress={handleCallDriver}
            style={styles.callDriver}
          />
          <CustomButton
            title="Cancel Ride"
            onPress={handleCancelRide}
            style={[styles.cancelRide, { backgroundColor: 'white' }]}
            labelStyle={{ color: 'black' }}
          />
        </View>

        <TouchableOpacity onPress={toggleExpandCollapse}>
          <IconButton
            icon={isExpanded ? "chevron-up" : "chevron-down"}
            size={34}
            iconColor='#B80028'
            style={styles.expandButton}
          />
        </TouchableOpacity>
      </S.CreditCardInfo>

      <S.Map
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: -19.920183,
          longitude: -43.936825,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled
        showsCompass={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        customMapStyle={customMapStyle}
      >
        <Polyline
          coordinates={[
            { longitude: -43.935129, latitude: -19.916483 },
            { longitude: -43.935322, latitude: -19.917199 },
            { longitude: -43.935452, latitude: -19.917306 },
            { longitude: -43.935597, latitude: -19.917413 },
            { longitude: -43.936989, latitude: -19.918178 },
            { longitude: -43.938683, latitude: -19.919081 },
            { longitude: -43.937698, latitude: -19.920745 },
            { longitude: -43.938009, latitude: -19.921849 },
            { longitude: -43.938881, latitude: -19.921655 },
          ]}
          strokeColor="#B80028"
          strokeWidth={4}
        />
        <Marker
          image={homeMarker}
          coordinate={{ latitude: -19.916483, longitude: -43.935129 }}
        >
          <Callout>
            <TextInput
              value={text}
              onChangeText={(text) => setText(text)}
              placeholder="Bole, Atlas"
            />
          </Callout>
        </Marker>
        <Marker
          image={destMarker}
          coordinate={{ latitude: -19.921655, longitude: -43.938881 }}
        >
          <Callout>
            <Text>Igreja de São José</Text>
          </Callout>
        </Marker>
      </S.Map>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setIsModalVisible(false);
              }}
            >
              <IconButton
                icon="arrow-left"
                size={24}
                iconColor="#B80028"
              />
            </TouchableOpacity>
            <Text style={styles.reasonText}>Reason to cancel</Text>
            <CallDriverCard
              estimatedTime="10-15"
              date="04 Apr 2022"
              startLocation="Piassa"
              endLocation="Bole road 10"
            />
            <View style={styles.checkboxContainer}>
              {['I have changed my mind', 'Driver is late', 'Price is high', 'Other'].map((reason, index) => (
                <View key={index} style={styles.checkboxItem}>
                  <Checkbox
                    status={reasons.includes(reason) ? 'checked' : 'unchecked'}
                    onPress={() => toggleReason(reason)}
                  />
                  <Text>{reason}</Text>
                </View>
              ))}
            </View>
            <CustomButton
              title="Cancel Ride"
              onPress={handleConfirmCancel}
              style={styles.confirmButton}
              fontSize={14}
            />
          </View>
        </View>
      </Modal>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  reasonText: {
    fontSize: 16,
    marginVertical: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButton: {
    fontSize: 14,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  callDriver: {
    margin: 0,
    fontSize: 12,
    borderRadius: 50,
  },
  cancelRide: {
    margin: 0,
    fontSize: 12,
    borderRadius: 50,
  },
  expandButton: {
    alignItems: 'center',
    padding: 10,
  },
});

export default Request;
