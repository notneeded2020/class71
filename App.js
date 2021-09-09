import React, {Component} from "react";
import { StyleSheet, Text, View, Image} from 'react-native';
import Search from './screens/search'
import Transactions from './screens/transactions'
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

export default class App extends Component {
  render(){
  return (
    <AppContainer/>
  );
 }
}

const tabnav = createBottomTabNavigator({
    Transactions:{screen:Transactions},
    Search:{screen:Search},
},
    {
     defaultNavigationOptions:({navigation})=>({
        tabBarIcon:()=>{
            const routeName = navigation.state.routeName
            if (routeName === "Transactions"){
              return(
                <Image 
                source = {require ("./assets/book.png")}
                style={{width:40,height:40}} 
                />
              )
            }
            else if (routeName === "Search"){
              return(
                <Image 
                source = {require ("./assets/searchingbook.png")}
                style={{width:40,height:40}}
                />
              )
            }
        }
      })
    }   
)

const AppContainer = createAppContainer(tabnav)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
