import React from 'react';
import { Image, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WriteStory from './screens/WriteStory';
import ReadStory from './screens/ReadStory';

export default class App extends React.Component{
  render(){
    {console.disableYellowBox = true}
    return(
      <AppContainer />
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  "Write Story": WriteStory,
  "Read Story": ReadStory
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Write Story"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Read Story"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:40}}
        />)
        
      }
    }
  })
}
  )

const AppContainer = createAppContainer(TabNavigator);