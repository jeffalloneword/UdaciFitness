import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MetricCard from './MetricCard'
import {  white } from '../utils/colors'

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
  render() {
    const { metrics } = this.props

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>Entry Detail - {JSON.stringify(this.props.navigation.state.params.entryID)}</Text>
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

export default connect(mapStateToProps)(EntryDetail)