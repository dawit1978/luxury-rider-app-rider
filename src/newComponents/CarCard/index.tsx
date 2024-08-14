import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import vip from '../../assets/icons/VIP.png';
import vvip from '../../assets/icons/VVIP.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CarCardProps = {
  name: string;
  imagePath: ImageSourcePropType;
  price: string;
  category: 'VIP' | 'VVIP' | 'Corporate';
  seats: number;
  speed: string;
  dropOffTime: string;
  theme: 'light' | 'dark'; // New prop for theme
};

const CarCard: React.FC<CarCardProps> = ({
  name,
  imagePath,
  price,
  category,
  seats,
  speed,
  dropOffTime,
  theme,
}) => {
  const isDarkTheme = theme === 'dark';

  return (
    <Card style={[styles.card, isDarkTheme && styles.darkCard]}>
      <View style={styles.container}>
        <Image source={imagePath} style={styles.image} resizeMode="contain" />

        <View style={styles.detailsContainer}>
          <Title style={[styles.title, isDarkTheme && styles.darkTitle]}>
            {name}
          </Title>
          <Text style={[styles.dropOffTime, isDarkTheme && styles.textLight]}>{dropOffTime} drop off</Text>

          <View style={styles.iconRow}>
            <View style={styles.iconContainer}>
              <Image
                resizeMode="stretch"
                source={category === 'VVIP' ? vvip : vip}
                style={styles.iconImage}
              />
              <Paragraph style={styles.iconText}>{category}</Paragraph>
            </View>
            <View style={styles.iconContainer}>
              <Paragraph style={styles.iconText}>{seats} seats</Paragraph>
            </View>
            <View style={styles.iconContainer}>
              <Paragraph style={styles.iconText}>{speed}</Paragraph>
            </View>
          </View>
          {/* <TouchableOpacity> */}
            <Card style={[styles.priceCard, isDarkTheme ? styles.priceCardDark : styles.priceCardLight]}>
              <Text style={[styles.price, { color: isDarkTheme ? '#000' : '#fff' }]}>{price}</Text>
            </Card>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: 340, 
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff', // Default light background
  },
  darkCard: {
    backgroundColor: '#B80028', // Dark theme background
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    marginRight:10,
  },
  image: {
    width: 130,
    height: 80,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle:'italic'
  },
  textLight: {
    color: '#fff',
  },
  darkTitle: {
    color: '#fff',
  },
  dropOffTime: {
    fontSize: 12,
    color: '#000', // Default to black for light theme
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  iconImage: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  iconText: {
    fontSize: 12,
  },
  priceCard: {
    alignSelf: 'center',
    alignContent:'center',
    justifyContent:'center',
    padding: 2,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%',
  },
  priceCardLight: {
    backgroundColor: '#B80028',
  },
  priceCardDark: {
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign:'center'
  },
  darkPrice: {
    color: '#fff',
  },
});

export default CarCard;
