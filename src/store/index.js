import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos: (state, payload) => {
      state.todos = payload
    },
    storeTodo: (state, payload) => {
      const index = state.todos.findIndex(todo => todo.id === payload.id)

      if (index !== -1) {
        state.todos[index] = payload
      } else {
        state.todos.push(payload)
      }
    },
    deleteTodo: (state, id) => {
      const index = state.todos.findIndex(todo => todo.id === id)

      if (index !== -1) {
        state.todos.splice(index, 1)
      } else {
        console.log('Todo not found')
      }
    }
  },
  actions: {
    getTodos: async (context) => {
      const response = await axios.get('http://localhost:3000/todos');
      context.commit('storeTodos', response.data);
    },
    addTodo: async (context, payload) => {
      const response = await axios.post('http://localhost:3000/todos', payload);
      context.commit('storeTodo', response.data);
    },
    updateTodo: async (context, payload) => {
      await axios.put(`http://localhost:3000/todos/${payload.id}`, payload);
      context.commit('storeTodo', payload);
    },
    deleteTodo: async (context, payload) => {
      await axios.delete(`http://localhost:3000/todos/${payload.id}`);
      context.commit('deleteTodo', payload.id);
    }
  },
  modules: {
  }
})
