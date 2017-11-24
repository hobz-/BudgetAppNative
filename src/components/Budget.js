import React, { Component } from 'react';
import {  View, Text, ScrollView } from 'react-native';
import { Link, Route } from 'react-router-native';

import * as firebase from "firebase";

import Expense from './Expense';
import ExpenseList from './ExpenseList';

class Budget extends Component {

  render() {
    const { match } = this.props;

    return(
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link
            to={`${match.url}/expenselist`}
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Expenses</Text>
          </Link>
          <Link
            to={`${match.url}/addexpense`}
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Add Expense</Text>
          </Link>
        </View>

        <ScrollView>
          <Route exact path={`${match.url}/expenselist`} component={ExpenseList} />
          <Route path={`${match.url}/addexpense`} component={Expense} />
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    flex: 1
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  navItemText: {
    fontSize: 22
  }
};

export default Budget;
