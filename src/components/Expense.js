import React, { Component } from 'react';
import {
  View, Text, TextInput, ActivityIndicator, TouchableOpacity, Picker
 } from 'react-native';
import * as firebase from "firebase";

class Expense extends Component {
  state = {
    title: "",
    cost: null,
    recurringPeriod: "",
    date: null,
    category: "",
    loading: false
  }

  submitExpense() {
    this.setState({loading: true});
    const currentUserId = firebase.auth().currentUser.uid;
    const expensePath = 'users/' + currentUserId + '/expense';

    const newExpenseKey = firebase.database().ref().child(expensePath).push().key;

    firebase.database().ref(expensePath + '/' + newExpenseKey).set({
      title: this.state.title,
      cost: this.state.cost,
      recurringPeriod: this.state.recurringPeriod,
      date: this.state.date,
      category: this.state.category,
      key: newExpenseKey
    }).then(this.setState({
      title: "",
      cost: null,
      recurringPeriod: "",
      date: null,
      category: "",
      loading: false
    }));
  }

  renderButton() {
    if (this.state.loading) {
        return <ActivityIndicator size="small" />
    }

    return (
      <TouchableOpacity
        onPress={this.submitExpense.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>
          Submit Expense
        </Text>
      </TouchableOpacity>
    );
  }

  onValueChange (value: string) {
    this.setState({
      recurringPeriod: value
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>Add Expense</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Title</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(title) => this.setState({title})}
            title="title"
            placeholder="Enter a title for the expense..."
            value={this.state.title}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Cost ($)</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(cost) => this.setState({cost})}
            title="cost"
            placeholder="10"
            value={this.state.cost}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Recurring Period</Text>
          <Picker
            style={{flex: 2, lineHeight: 23}}
            selectedValue={this.state.recurringPeriod}
            onValueChange={(recurringPeriod) => this.setState({recurringPeriod})}
          >

            <Picker.Item label="none" value="" />
            <Picker.Item label="Bi-Weekly" value="biweekly" />
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Semimonthly" value="semimonthly" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Date</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(date) => this.setState({date})}
            title="date"
            placeholder="DD/MM/YYYY"
            value={this.state.date}
            />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.titleLabel}>Category</Text>
          <Picker
            style={{flex: 2, lineHeight: 23}}
            selectedValue={this.state.category}
            onValueChange={(category) => this.setState({category})}
          >

            <Picker.Item label="none" value="" />
            <Picker.Item label="Housing" value="housing" />
            <Picker.Item label="Vehicle" value="vehicle" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Entertainment" value="entertainment" />
          </Picker>
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
    fontSize: 14,
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
    paddingBottom: 10,
    backgroundColor: '#fff'
  }
}

export default Expense;
