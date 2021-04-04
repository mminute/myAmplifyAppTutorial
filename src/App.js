import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation, Storage } from 'aws-amplify';

function App() {
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => {
    Storage.get('ShinyAndChrome.gif')
      .then((data) => {
        setFileUrl(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className="App">
      <img src={fileUrl} />
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
