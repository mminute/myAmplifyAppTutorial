import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';

const ListTodos = `
  query {
    listTodos {
      items {
        completed
        description
        id
        name
      }
    }
  }
`

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(async ()=> {
    const todoData = await API.graphql(graphqlOperation(ListTodos));
    setTodos(todoData.data.listTodos.items);
  }, []);

  console.log(todos);

  return (
    <div className="App">
      {todos.map((todo) => (
        <div>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
