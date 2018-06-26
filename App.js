import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './components/homepage';
import CaloriesContainer from '././components/caloriescontainer';
import Router from '././components/router'
import MealsCaloriesList from '././components/mealscalorieslist';
import NutrientsFromCalories from '././components/nutrientsfromcalories';
import DishSearch from '././components/dishSearch';
import DishResults from '././components/dishResults';
import MealPlan from '././components/mealPlan';
import MealPlanResults from '././components/mealPlanResults';
import NutrientsFromMealPlan from '././components/nutrientsFromMealPlan';
import Favorites from '././components/favorites';
import { MainStyle } from './styles';


import {
  HOME,
  CALORIESHOME,
  MEALSCALORIESLIST,
  NUTRIENTSFROMCALORIES,
  MEALPLAN,
  MEALPLANRESULTS,
  NUTRIENTSFROMMEALPLAN,
  DISHSEARCH,
  DISHRESULTS,
  FAVORITES
} from '././components/constants';


export default class App extends Component {
  state = {
    selected: HOME,
    propsToSend: {},
    favorites: []
  }

  link = (id, props = {}) => {
    this.setState({
      selected: id,
      propsToSend: props
    })
  }

  saveMeals(meal) {
    var newArr = [...this.state.favorites];
    newArr.push(meal);
    this.setState({
      favorites: newArr
    })
    alert('Added to favorites')
  }

  removeMeals(title) {
    var newArr = [...this.state.favorites];
    var index = newArr.findIndex(item => item.title == title)
    newArr.splice(index, 1);
    this.setState({
      favorites: newArr
    })
    alert('Meal has been removed')
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router selected={this.state.selected} >
          <Home
            id={HOME}
            link={this.link} />
          <CaloriesContainer
            id={CALORIESHOME}
            link={this.link} />
          <MealsCaloriesList
            id={MEALSCALORIESLIST}
            link={this.link}
            {...this.state.propsToSend}
            saveMeals={this.saveMeals.bind(this)}
          />
          <NutrientsFromCalories
            id={NUTRIENTSFROMCALORIES}
            {...this.state.propsToSend}
            link={this.link}
          />
          <DishSearch
            id={DISHSEARCH}
            {...this.state.propsToSend} // propsToSend is a mailbox that holds the props to be sent down.  
            link={this.link}
          />
          <DishResults
            id={DISHRESULTS}
            {...this.state.propsToSend}
            link={this.link}
          />
          <MealPlan
            id={MEALPLAN}
            {...this.state.propsToSend}
            link={this.link}
          />
          <MealPlanResults
            id={MEALPLANRESULTS}
            {...this.state.propsToSend}
            link={this.link}
            saveMeals={this.saveMeals.bind(this)}
          />
          <NutrientsFromMealPlan
            id={NUTRIENTSFROMMEALPLAN}
            {...this.state.propsToSend}
            link={this.link}
          />
          <Favorites
            id={FAVORITES}
            link={this.link}
            {...this.state.propsToSend}
            favorites={this.state.favorites}
            removeMeals={this.removeMeals.bind(this)}

          />
        </Router>
      </View >
    );
  }
}


// Here are sending everything down to the App.js component because this is where our Router component is being imported as well.  We use the router to navigate to 
// to the desired page through the ID we made for each component.  The router then knows which page should show up on the screen.  The tricky part is that we also had to send down props 
// as well in the router.

