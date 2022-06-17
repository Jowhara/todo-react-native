import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

export default function Searchfield(props) {
  const { searchItems } = props
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        {searchItems.length ? (
          searchItems.map((item) => {
            return (
              <View style={styles.itemView}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )
          })
        ) : (
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>Sökningen gav ingen träff..</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    bottom: 0,
  },
  subContainer: {
    backgroundColor: 'darkgrey',
    paddingTop: 10,
    marginHorizontal: 50,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  itemView: {
    backgroundColor: 'white',
    height: 30,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  itemText: {
    color: 'black',
    paddingHorizontal: 10,
  },
  noResultView: {
    alignSelf: 'center',
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  noResultText: {
    fontSize: 18,
    color: 'yellow',
  },
})
