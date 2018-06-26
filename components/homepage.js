import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { CALORIESHOME, DISHSEARCH, MEALPLAN, FAVORITES } from './constants'
import { MainStyle } from '../styles';




export default class Home extends Component {

  render() {

    return (

      <ImageBackground style={MainStyle.container} source={require("../images/pattern2.png")}>
        <View style={styles.header} >
          <Image style={styles.logo} source={require('../images/logo2.png')} />
        </View>

        <View style={{ marginTop: 50, }}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, }} >  </Text>
        </View>

        <View>

          <TouchableOpacity style={styles.button} onPress={() => { this.props.link(DISHSEARCH) }}>
            <Text>Food Name</Text>
          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity style={styles.button} onPress={() => { this.props.link(CALORIESHOME) }}>
            <Text> Calorie Count </Text>
          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity style={styles.button} onPress={() => { this.props.link(MEALPLAN) }}>
            <Text> Meal Plan </Text>
          </TouchableOpacity>

        </View>

        <View>

          <TouchableOpacity style={styles.button} onPress={() => { this.props.link(FAVORITES) }}>
            <Text> Favorites </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.image}></View>

      </ImageBackground>


    );
  }
}

const styles = StyleSheet.create({

  header: {
    width: 415,
    height: 195,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 90
  },

  button: {
    backgroundColor: '#FEDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    width: 120,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "black",
  },

  image: {
    marginTop: 40,
    height: 200,
  },

  logo: {
    height: 250,
    width: 200
  }

});