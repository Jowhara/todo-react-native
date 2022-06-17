import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Task from './components/Task'
import Searchfield from './components/Searchfield'
import { YellowBox } from 'react-native-web'

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([
    'träna',
    'studera',
    'handla',
    'städa',
    'tvätta',
    'diska',
    'dammsuga',
  ])
  const [searchItems] = useState([
    'träna',
    'studera',
    'handla',
    'städa',
    'tvätta',
    'diska',
    'dammsuga',
  ])
  const [inProgress, setInProgress] = useState([])
  const [removeItems, setRemoveItems] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState(false)

  const onSearch = (text) => {
    if (text) {
      setSearch(true)
      const temp = text.toLowerCase()

      const tempList = searchItems.filter((item) => {
        if (item.match(temp)) return item
      })
      setFiltered(tempList)
    } else {
      setSearch(false)
      setFiltered(searchItems)
    }
  }

  const progressTask = (index) => {
    let itemsCopy = [...taskItems]
    const progress = itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
    setInProgress([...inProgress, progress])
  }

  const completeTask = (index) => {
    let itemsCopy = [...inProgress]
    const del = itemsCopy.splice(index, 1)
    setInProgress(itemsCopy)
    setRemoveItems([...removeItems, del])
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <TextInput
              style={styles.input}
              placeholder="Sök"
              placeholderTextColor="black"
              onChangeText={onSearch}
            />
          </View>

          <Text style={styles.sectionTitle}>Dagens uppgifter</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => progressTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })}
          </View>

          <Text style={styles.sectionTitle}>Pågående</Text>
          <View style={styles.items}>
            {inProgress.map((item, progress) => {
              return (
                <TouchableOpacity key={progress} onPress={() => completeTask(progress)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })}
          </View>

          <Text style={styles.sectionTitle}>Klara</Text>
          <View style={styles.doneWrapper}>
            {removeItems.map((item, del) => {
              return (
                <View key={del}>
                  <Task text={item} />
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>

      {search && <Searchfield onPress={() => setSearch(false)} searchItems={filtered} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  items: {
    marginTop: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 24,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    width: '100%',
  },
  doneWrapper: {
    textDecorationLine: 'line-through',
  },
})
