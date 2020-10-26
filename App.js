
import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading.js';
import * as Location from "expo-location";
import axios from 'axios';

const API_KEY = "03aeb5a37f912abdf7240eab442f413e";
export default class extends React.Component {
  state={
    isLoding:true
  };
  getWeather = async(latitude,longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    console.log(data);
  };
  getLocation = async() =>{
    try {
      await Location.requestPermissionsAsync();
     
      const { coords:{latitude,longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude)
      this.setState({isLoding:false})
      
      
    } catch (error) {
      Alert.alert("실패");
    }

  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const {isLoding} = this.state;
    return isLoding ? <Loading/> : null;
  }
}
