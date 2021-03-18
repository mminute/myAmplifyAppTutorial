import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation, Storage } from 'aws-amplify';

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
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');

  const handleChange = (e) => {
    const targetFile = e.target.files[0];
    setFile(targetFile);
    setFileUrl(URL.createObjectURL(targetFile));
    setFilename(targetFile.name);
  };

  const saveFile = () => {
    Storage.put(filename, file)
      .then(() => {
        console.log('successfully saved!');
        setFilename('');
        setFile('');
        setFileUrl('');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <img src={fileUrl} />
      <button onClick={saveFile}>Save File</button>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
