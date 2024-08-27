import { createDrawerNavigator, DrawerContentComponentProps,DrawerHeaderProps} from "@react-navigation/drawer";
import TabBarNavigator from "./TabBarNavigator"
// import Home from '../screens/Home';
// import News from '../screens/News';
// import Matches from '../screens/Matches';
// import Shop from '../screens/Shop';
// import GroupChat from '../screens/GroupChat';
import { DrawerParamsList, DrawerProps as Props} from "../../types";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import { DrawerContent } from "../components/DrawerContent";
import CurrentLocation from '../screens/CurrentLocation';
import { ReactNode, useState } from "react";
import Search from "../components/Search"
import EIcon from 'react-native-vector-icons/Entypo';
import MapScreen from "../screens/MapScreen";
import ListingScreen from "../screens/ListingScreen";
import CarDescription from "../screens/CarDescription";
import Request from "../screens/Request";
import YourRide from "../screens/YourRide";
import DriverSearchingScreen from "../screens/DriverSearchingScreen";
interface DrawerProps /*extends Props<DrawerParamsList, "DrawerContent">*/{
}

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerNavigator: React.FC<DrawerProps> = (props)=> {
    const [value, setValue] = useState<string | undefined>();

    return(
        <Drawer.Navigator
        screenOptions={{
            header:(props:DrawerHeaderProps):ReactNode=>(

              <View style={styles.menuAndLogoContainer}>
                <View style={styles.headerContainer}>
                      <TouchableOpacity
                        style={{zIndex:1, backgroundColor: "white",width:40, height:40, alignItems:"center", justifyContent:"center", borderRadius:20 }}
                        onPress={() => {
                          props.navigation.toggleDrawer();
                        }}
                      >
                        <EIcon name="menu" size={25} color="#000000" />
                      </TouchableOpacity>
              
                 {/* <View style={styles.logoContainer}>
                      <Image
                        source={require("../assets/logo.png")}
                        style={{ height: 55, width: 55}}
                        />
                  </View> */}
              </View>
                    
                    {/* <View
                    style={styles.searchContainer}
                    >
                      <Search
                        value={value}
                        handleChange={(text) => {
                          setValue(text)
                        }}
                      />
                    </View> */}
                   
                </View>)
        }}
         drawerContent={(props:DrawerContentComponentProps):ReactNode=> 
            <DrawerContent {...props}/>
         }>
            {/* <Drawer.Screen
             name="CurrentLocation"
             component={CurrentLocation}
              
             /> */}
            <Drawer.Screen
             name="MapScreen"
             component={MapScreen}
            //  options={{headerShown:false}}
              
              
             />
            <Drawer.Screen
             name="ListingScreen"
             component={ListingScreen}
             options={{headerShown:false}}
              
             />
            {/* <Drawer.Screen
            options={{headerShown:false}}
             name="CarDescription"
             component={CarDescription}
              
             /> */}
              <Drawer.Screen
            // options={{headerShown:false}}
             name="DriverSearching"
             component={DriverSearchingScreen}
              
             />
            <Drawer.Screen
            options={{headerShown:false}}
             name="Request"
             component={Request}
              
             />
            <Drawer.Screen
            options={{headerShown:false}}
             name="YourRide"
             component={YourRide}
              
             />
            <Drawer.Screen
            name="TabBarNavigator"
            component={TabBarNavigator}
            options={{
                title:"Home"
            }}
            />

        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: "80%",
        justifyContent:'space-between',
        alignItems: 'center',
        alignSelf:"center",
        position: "absolute",
        top: 50,
        borderRadius: 10,
        height: 45,
        // backgroundColor: "#FFFFFF"

    },
    searchContainer: {
        width: "83%",
        marginLeft:"12%",
        position: "absolute",
        top: 53,
        zIndex:0,
        alignItems: "flex-end",
    },
    logoContainer:{
        backgroundColor: "#FFFFFF",
        borderColor:"#B80028",
        borderWidth: 2,
        borderRadius: 50,
        overflow:"hidden",
        marginRight:"38%"
    },
    menuAndLogoContainer:{
      marginTop:20,
      flex:2,
    }
});

export default DrawerNavigator