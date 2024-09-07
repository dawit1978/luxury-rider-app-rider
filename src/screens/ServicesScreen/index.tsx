import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Appbar, Avatar, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCard from '../../newComponents/ServicesCard';
import BackButton from '../../newComponents/BackButton';
import carImage from '../../../assets/ride.png';
import foodImage from '../../../assets/food.png';
import delivery from '../../../assets/package.png';
import mart from '../../../assets/reserve.png';

const ServicesScreen: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        {/* <BackButton /> */}
        <Appbar.Content title="Services" style={styles.title} />
      </Appbar.Header>

      <LinearGradient colors={['#B80028', '#FF5733']} style={styles.balanceCard}>
        <View style={styles.balanceCardContent}>
          <Avatar.Icon size={48} icon="account" />
          <View style={styles.balanceTextContainer}>
            <Title  style={{color: "white", fontWeight:"bold"}}>Luxuryum</Title>
            <Title style={{color: "white", fontWeight:"bold"}}> balance: 0</Title>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.servicesContainer}>
        <ServicesCard title="Ride" imagePath={carImage} navigateTo="back" />
        <ServicesCard title="Food" imagePath={foodImage} navigateTo="Home" />
        <ServicesCard title="Delivery" imagePath={delivery} navigateTo="Home" />
        <ServicesCard title="Rewards" imagePath={mart} navigateTo="Home" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
  },
  balanceCard: {
    margin: 30,
    borderRadius: 8,
    shadowColor:'#000',
    elevation:5,
  },
  balanceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingLeft: 10,
  },
  balanceTextContainer: {
    marginTop:70,
    marginLeft: 20,
    flexDirection:"row"

  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default ServicesScreen;
