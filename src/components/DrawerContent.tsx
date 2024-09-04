import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeS from 'react-native-vector-icons/FontAwesome5'
import ContactSupport from 'react-native-vector-icons/MaterialIcons'
// import avatar from '../../assets/avatar.png';


import { DrawerParamsList, DrawerProps } from '../../types';
type DrawerContentNavigationProp = DrawerProps<DrawerParamsList, 'DrawerContent'>['navigation']
type DrawerContentRouteProp = DrawerProps<DrawerParamsList, 'DrawerContent'>['route']


export const DrawerContent: React.FC<DrawerContentComponentProps>=(props)=>{
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const paperTheme = useTheme();

    const toggleTheme =  () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                <View style={styles.userSection}>
                    <Avatar.Image 
                        size={80} 
                        source={require('../assets/avatar.png')} 
                        style={styles.avatar} 
                        style={{backgroundColor:"#FF7F7F"}}
                    />
                    <Text style={styles.userName}>Abel Tesfaye</Text>
                    <Text style={styles.userEmail}>abel.tesfaye@gmail.com</Text>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <EIcon name="home" color={color} size={size} />
                            )}
                            color="#B80028" 
                            label="Home"
                            onPress={() => {props.navigation.navigate('TabBarNavigator',{
                                screen:"Home"
                            })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome name="history" color={color} size={size} />
                            )}
                            label="RideHistory"
                            color="#B80028"
                            onPress={() => {props.navigation.navigate('DrawerNavigator',{
                                screen:"WhereToScreen"
                            })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5 name="wallet" color={color} size={size} />
                            )}
                            label="Wallet"
                            onPress={() => {props.navigation.navigate('TabBarNavigator',{
                                screen:"Wallet"
                            })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesomeS name="share" color={color} size={size} />
                            )}
                            label="Share"
                            onPress={() => {props.navigation.navigate('TabBarNavigator',{
                                screen:"Share"
                            })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <ContactSupport name="contact-support" color={color} size={size} />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('TabBarNavigator',{
                                screen:"Support"
                            })}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Corporate</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
    //   paddingVertical: 12,
      paddingHorizontal: 16,
    },

    // new
    userSection: {
        backgroundColor: '#B80028',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius:25,
        borderBottomRightRadius:25
      },
      avatar: {
        marginBottom: 10,
      },
      userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
      },
      userEmail: {
        fontSize: 16,
        color: '#ffffff',
      },
  });