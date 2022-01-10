import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    console.log(newTaskTitle)
    if (tasks.length > 0 && tasks.find(e => e.title == newTaskTitle)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return;
    }
    const newTask = { id: new Date().getTime(), title: newTaskTitle, done: false };
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    if (tasks.some(e => e.id == id)) {
      const newTaskList = tasks.map(task => ({ ...task }));

      newTaskList.map(task => {
        if (task.id == id) {
          task.done = !task.done;
        }
      })
      setTasks(newTaskList);
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state  
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            if (tasks.some(e => e.id == id)) {
              const updateList = tasks.filter(e => e.id != id)
              setTasks(updateList);
            }
          },
          style: 'cancel'
        }
      ])

  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    if (tasks.some(e => e.id == taskId)) {
      const newTaskList = tasks.map(task => ({ ...task }));

      newTaskList.map(task => {
        if (task.id == taskId) {
          task.title = taskNewTitle;
        }
      })
      setTasks(newTaskList);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})