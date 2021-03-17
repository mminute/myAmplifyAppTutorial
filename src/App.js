import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';

// const ListTodos = `
//   query {
//     listTodos {
//       items {
//         completed
//         description
//         id
//         name
//       }
//     }
//   }
// `

function App() {
  // const [todos, setTodos] = useState([]);

  // useEffect(async ()=> {
  //   const todoData = await API.graphql(graphqlOperation(ListTodos));
  //   setTodos(todoData.data.listTodos.items);
  // }, []);

  // console.log(todos);

  // return (
  //   <div className="App">
  //     {todos.map((todo) => (
  //       <div>
  //         <h3>{todo.name}</h3>
  //         <p>{todo.description}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    const data = await API.get('peopleApi', '/people');
    console.log(data);
    setPeople(data.people)
  }, []);

  return (
    <div className="App">
      {people.map((person, i) => (
        <div key={person.name}>
          <h3>
            {person.name}
          </h3>
          <p>{person.hairColor}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
