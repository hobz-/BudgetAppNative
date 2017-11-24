import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableWithoutFeedback, UIManager, LayoutAnimation
} from 'react-native';
import * as firebase from "firebase";
import moment from 'moment';

class ExpenseListItem extends Component {
  state = {
    expanded: false
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  _onPress = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  setTitleStyle = (expanded) => {
    if (expanded)
      return {
        backgroundColor: '#e6e6e6',
        fontSize: 20
      }
    else {
      return {
        backgroundColor: '#fff',
        fontSize: 20
      }
    };
  }

  capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  renderDescription() {
    if (this.state.expanded) {
      return(
        <View style={{ backgroundColor: '#f2f2f2'}}>
          <Text style={styles.expandedTextStyle}>Cost: ${this.props.item.cost} </Text>
          <Text style={styles.expandedTextStyle}>{"Recurring Period: "}
            { this.props.item.recurringPeriod == "" ? "None" : this.capitalizeWord(this.props.item.recurringPeriod) }
          </Text>
          <Text style={styles.expandedTextStyle}>Category: {this.capitalizeWord(this.props.item.category)}</Text>
        </View>
      )
    }
  }

  render() {
    return(
      <TouchableWithoutFeedback
        onPress={this._onPress}>
        <View>
          <Text
            {...this.props}
            style={this.setTitleStyle(this.state.expanded)}
          >
            {this.props.item.title} ({this.props.date})
          </Text>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class ExpenseList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: (new Map(): Map<string, boolean>),
      data: []
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUserId = user.uid;
        expensePath = 'users/' + currentUserId + '/expense';
        expenseRef = firebase.database().ref().child(expensePath);
        this.listenForExpenses(expenseRef);
      }
    });
  }

  listenForExpenses(expenseRef) {
    expenseRef.on('value', (snap) => {

      var expenses = [];
      snap.forEach((expense) => {
        expenses.push({
          title: expense.val().title,
          key: expense.key,
          cost: parseFloat(expense.val().cost),
          recurringPeriod: expense.val().recurringPeriod,
          date: expense.val().date,
          category: expense.val().category
        });
      });

      this.setState({ data: expenses });
    });
  }

  _keyExtractor = (item, index) => item.id;

  _formatDate = (_date) => {
    var day = moment(_date, "DD/MM/YYYY").format("ddd, MMM DD/YY");

    return day;
  }

  _renderItem = ({item}) => (
    <ExpenseListItem
      style={styles.itemStyle}
      id={item.key}
      item={item}
      date={this._formatDate(item.date)}
    />
  )

  render() {
    return(
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.listStyle}
          scrollEnabled={true}
        />
    )
  }
}

const styles = {
  listStyle: {
    marginLeft: 5,
    marginRight: 5,
    padding:5
  },
  itemStyle: {
    padding: 1
  },
  expandedTextStyle: {
    fontSize: 18
  }
}

export default ExpenseList;
