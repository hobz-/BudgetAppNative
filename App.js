import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import LogoutButton from './src/components/LogoutButton';
import Home from './src/components/Home';
import Budget from './src/components/Budget';
import { NativeRouter, Link, Route } from 'react-router-native';
import * as firebase from "firebase";

import Firebase from './src/firebase/firebase';

class App extends Component {

  state = { loggedIn: null, currentUser: null}

  componentWillMount() {
    if (!firebase.apps.length) {
      Firebase.initialise();
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, currentUser: user.uid});
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderMenu() {
    if(this.state.loggedIn)
    {
      return(
        <View style={styles.nav}>
          <Link
            to="/"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Home</Text>
          </Link>
          <Link
            to="/budget"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Budget</Text>
          </Link>
          <View style={styles.navItemButton}>
            <LogoutButton />
          </View>
        </View>

      );
    } else {
      return(
        <View style={styles.nav}>
          <Link
            to="/"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Home</Text>
          </Link>
          <Link
            to="/signup"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Sign-Up</Text>
          </Link>
          <Link
            to="/login"
            underlayColor='#f0f4f7'
            style={styles.navItem}>
              <Text style={styles.navItemText}>Login</Text>
          </Link>

        </View>
    )};
  }

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          {this.renderMenu()}
          <View style={{flex: 1}}>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/budget" component={Budget} />
          </View>
        </View>
      </NativeRouter>
    )
  }
}

const styles = {
  container: {
    borderWidth: 1,
    marginTop: 5,
    backgroundColor: '#fff',
    flex: 1
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    fontSize: 30,
    backgroundColor: '#fff'
  },
  navItemButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  navItemText: {
    fontSize: 22,
  }
};

export default App;
