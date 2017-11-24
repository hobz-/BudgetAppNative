import React, { Component } from 'react';
import {
   View, Text, TextInput, ActivityIndicator, TouchableOpacity
  } from 'react-native';
import firebase from 'firebase';

import { Redirect } from 'react-router-native';

class LoginForm extends Component {

  state = {
    email: '',
    pass: '',
    loading: false,
    redirectToHome: false
  }

  async login() {

      const { email, pass } = this.state;

      try {
          await firebase.auth()
              .signInWithEmailAndPassword(email, pass)
              .then(() => {
                this.setState({
                  email: '',
                  password: '',
                  loading: false,
                  error: '',
                  redirectToHome: true});
              });

          console.log("Logged In!");

      } catch (error) {
          console.log(error.toString())
      }

  }

  renderButton() {

    if (this.state.loading) {
        return <ActivityIndicator size="small" />
    }

    return (
      <TouchableOpacity
        onPress={this.login.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>
          Log In
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { redirectToHome } = this.state;

    if (redirectToHome) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>E-mail</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(email) => this.setState({email})}
            title="E-mail"
            placeholder="user@email.com"
            value={this.state.email}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Password</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(pass) => this.setState({pass})}
            title="Password"
            placeholder="password"
            value={this.state.password}
            secureTextEntry={true}
            />
        </View>

        <View style={styles.inputContainer}>
          {this.renderButton()}
        </View>
      </View>
    )
  }

}

const styles = {
  viewStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    flexDirection: 'row',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'blue'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleLabel: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    alignSelf: 'center'
  },
  inputField: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: '#007aff',
    fontWeight: '1000',
    paddingTop: 10,
    paddingBottom: 10
  }
}

export default LoginForm;
