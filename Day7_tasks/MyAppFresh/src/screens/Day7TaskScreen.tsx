import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

interface TaskItem {
  id: string;
  title: string;
}

export default function Day7TaskScreen() {
  const [inputText, setInputText] = useState<string>('');
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: '1', title: 'Learn View and Text components' },
    { id: '2', title: 'Master ScrollView and FlatList' },
    { id: '3', title: 'Implement Pressable and TouchableOpacity' },
  ]);

  const handleAddTask = () => {
    if (inputText.trim() === '') return;
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: inputText,
    };
    setTasks([newTask, ...tasks]);
    setInputText('');
  };

  const renderItem = ({ item }: { item: TaskItem }) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.headerTitle}>Day 7 - Task 4 Dashboard</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400' }}
          style={styles.bannerImage}
        />

        <Pressable
          style={({ pressed }) => [
            styles.pressableCard,
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={() => alert('Pressable button clicked!')}
        >
          <Text style={styles.pressableText}>Tap this Pressable Component</Text>
        </Pressable>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a new task..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.touchableButton} onPress={handleAddTask}>
            <Text style={styles.touchableButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.sectionHeading}>Your Task List (FlatList)</Text>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  pressableCard: {
    backgroundColor: '#6c5ce7',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  pressableText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
  },
  touchableButton: {
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  touchableButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listContainer: {
    marginTop: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  listText: {
    fontSize: 15,
    color: '#2d3436',
  },
});