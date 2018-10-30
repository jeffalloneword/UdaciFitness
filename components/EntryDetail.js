import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import MetricCard from './MetricCard'
import {  white } from '../utils/colors'
import TextButton from './TextButton'
import  { addEntry } from '../actions'
import { removeEntry } from '../utils/api'

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const {  entryID } = navigation.state.params

    const year = entryID.slice(0, 4)
    const month = entryID.slice(5, 7)
    const day = entryID.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  reset = () => {
    const { remove, goBack, entryID } = this.props

    remove()
    goBack()
    removeEntry(entryID)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{margin: 20}} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { entryID } = navigation.state.params

  return {
    entryID,
    metrics: state[entryID],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryID } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryID]: timeToString() === entryID
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)