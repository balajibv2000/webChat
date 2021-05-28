import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react'
import Message from './components/Message'
import './App.css';
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [messages, setMessage] = useState([])
  const [input, setInput] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [input])

  useEffect(() => {
    setUserName(prompt("Please enter your name"));
  }, [])

  const addMessage = (event) => {
    event.preventDefault(); // will stop refresh

    db.collection('messages').add({
      message: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessage([...messages, { username: userName, message: input }]);
    setInput('');
  }

  return (
    <div className="App">
      <div className='app__logoContainer'>
        <img className='app__logo' src='webChat.png' />
        <h1>webChat</h1>
      </div>
      <h2>Welcome {userName}</h2>
      <div className='app__container'>
        <form className='app__form'>
          <FormControl className='app__formControl'>

            <Input className='app__input' placeholder='Type here ...' value={input} onChange={event => setInput(event.target.value)} />
            <IconButton className='app__iconButton' disabled={!input} variant="contained" color="primary" type='submit' onClick={addMessage}>
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </div>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={userName} text={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
