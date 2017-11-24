import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import {
  VictoryChart, VictoryStack, VictoryBar, VictoryTheme, VictoryAxis,
  VictoryTooltip, VictoryLabel
} from 'victory-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          cost: parseFloat(expense.val().cost),
          date: expense.val().date,
          category: expense.val().category
        });
      });

      this.setState({ data: expenses });
    });
  }

  render() {

    const _data = this.state.data;

    return(
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>Expense Distribution</Text>
        <View>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}>
            <VictoryAxis
              tickFormat={(x) => x}
            />
            <VictoryAxis
              dependentAxis
              tickCount={4}
            />
            <VictoryBar
              data={_data}
              y="cost"
              x="category"
            />
          </VictoryChart>
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
  }
}

export default Home;
