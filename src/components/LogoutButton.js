import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import { Redirect } from 'react-router-native';

class LogoutButton extends Component {

  state = { loading: false }

  async logout() {
    this.setState({ loading: true });
    try {
      await firebase.auth().signOut()
                    .then(() => {
                      this.setState({ loading: false });
                      <Redirect to="/" />;
                    });

    } catch (error) {
      this.setState({ loading: false })
      console.log(error);
    }
  }

  renderButton() {
    if (this.state.loading) {
        return <ActivityIndicator size="small" />
    }

    return (
      <TouchableOpacity
        onPress={this.logout.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>
          Log-Out
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View>
        {this.renderButton()}
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 22
  }
}

export default LogoutButton;
