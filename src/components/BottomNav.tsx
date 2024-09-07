import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { ReactElement } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
type icon = {
         screen:string;
         icon:ReactElement;
}

const color = "#B80028"

const buttons:Array<icon> =[
    {screen:"Home", icon:<EIcon name="home" color={color} size={26} />},
    {screen:"News", icon:<FIcon name="history" color={color} size={26} />},
    // {screen:"Matches", icon:<Icon name="notifications" color={color} size={26} />},
    {screen:"Shop", icon:<FIcon name="user" color={color} size={26} />},
]
const BottomNav: React.FC<any> = (props) => {
    const navigator = useNavigation();
  return (
    <View style ={styles.container}>
        {
           buttons.map(btn =>(
                <TouchableOpacity style={styles.icon} key={btn.screen} onPress={()=>{navigator.navigate(btn.screen)}}>
                    {btn.icon}
                </TouchableOpacity>
            ))
        
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', // In React Native, flex is the default for layout, so you can omit this line
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        gap: 30, // React Native does not have a 'gap' property, but you can use margins or paddings on child elements
    
        position: 'absolute',
        width: 330,
        height: 47,
        left: '7.5%',
        // marginLeft: -194, // To center the element, half of the width
        top: '89%',
        // marginTop: 379.5 - 23.5, // Adjust for vertical centering
    
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5.609, height: 4.4872 },
        shadowOpacity: 0.15,
        elevation:4,
        shadowRadius: 6.73079,
        borderRadius: 11.218,    
      },
      icon:{
          marginVertical:10,
          marginHorizontal:10,
          height:30,
          width:30,
          justifyContent:"center",
        // //   shadowColor: '#000000',
        //   shadowOffset: { width: 5.609, height: 4.4872 },
        //   shadowOpacity: 0.15,
        //   elevation:4,
          alignItems: "center"
        }

})

export default BottomNav