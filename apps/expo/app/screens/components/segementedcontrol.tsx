import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const SegmentedControl = ({ segments, onChange }) => {
  const [selectedSegment, setSelectedSegment] = useState(0)

  const handleSegmentPress = (index) => {
    setSelectedSegment(index)
    onChange(index) // Pass the selected index to the parent component
  }

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSegmentPress(index)}
          style={[styles.segment, index === selectedSegment ? styles.selectedSegment : null]}
        >
          <Text style={index === selectedSegment ? styles.selectedText : styles.text}>
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
    width: '95%',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#007AFF',
  },
  selectedText: {
    color: '#FFFFFF',
  },
})

export default SegmentedControl
