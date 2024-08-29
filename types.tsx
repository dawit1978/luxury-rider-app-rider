import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import {DrawerScreenProps} from "@react-navigation/drawer"
import { ParamListBase, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";
export type TabBarParamsList = { 
    Home: undefined;
    News: undefined;
    Matches: undefined;
    Shop: undefined; 
    GroupChat: undefined;
    MapScreen: undefined;
}
export type DrawerParamsList ={
 CurrentLocation: undefined;
 WhereToScreen: { focusInput?: 'start' | 'plus' }; // Optional parameter
  DriverSearching: { carImageUri: ImageSourcePropType };
 ListingScreen: undefined;
 MapScreen:undefined;
 Request:undefined;
 YourRide:undefined;
 TabBarNavigator: NavigatorScreenParams<TabBarParamsList>;
 DrawerContent: NavigatorScreenParams<TabBarParamsList>;
};
// export type 
export type StackParamsList = {
    DrawerNavigator: undefined;
    Verification:undefined;
    SelectDestination:undefined;
    NewsDetail: undefined;
    MatchDetail: undefined;
    ShopItemDetail: undefined;
    Wallet: undefined;
    Share: undefined;
    Support:undefined;
    
    
}

export type TabBarProps<T extends ParamListBase, K  extends keyof T> = MaterialBottomTabScreenProps<T, K>

export type DrawerProps<T extends ParamListBase, K extends keyof T> = CompositeScreenProps< DrawerScreenProps<T, K | any>, TabBarProps<T, keyof T>>

export type StackProps<T extends ParamListBase, K extends keyof T> = CompositeScreenProps<StackScreenProps<T, K | any>, DrawerProps<T,keyof T>>
