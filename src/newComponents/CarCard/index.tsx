import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import vip from '../../assets/icons/VIP.png';
import vvip from '../../assets/icons/VVIP.png';

type CarCardProps = {
  name: string;
  imagePath: ImageSourcePropType;
  price: string;
  category: 'VIP' | 'VVIP' | 'Corporate';
  seats: number;
  speed: string;
  dropOffTime: string;
  theme: 'light' | 'dark';
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
          <Card style={[styles.priceCard, isDarkTheme ? styles.priceCardDark : styles.priceCardLight]}>
            <Text style={[styles.price, { color: isDarkTheme ? '#000' : '#fff' }]}>{price}</Text>
          </Card>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    width: 320,
    // height:100,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: '#fff',
  },
  darkCard: {
    backgroundColor: '#B80028',
  },
  container: {
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    width: 100,
    height: 60,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#fff',
  },
  darkTitle: {
    color: '#fff',
  },
  dropOffTime: {
    fontSize: 12,
    color: '#000',
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
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  iconImage: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  iconText: {
    fontSize: 12,
  },
  priceCard: {
    alignSelf: 'center',
    padding: 4,
    marginTop: 5,
    borderRadius: 6,
    width: '90%',
  },
  priceCardLight: {
    backgroundColor: '#B80028',
  },
  priceCardDark: {
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CarCard;
