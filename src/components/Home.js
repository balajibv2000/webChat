import React from 'react'
import Message from './Message'
import { FormControl, Input } from '@material-ui/core';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import firebase from 'firebase'
import db from '../firebase'
import { useState, useEffect } from 'react'

function Home(props) {

    const { handleLogout, userName } = props
    const [messages, setMessage] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        db.firestore().collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setMessage(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
        })
    }, [input])

    const addMessage = (event) => {
        event.preventDefault(); // will stop refresh

        db.firestore().collection('messages').add({
            message: input,
            username: userName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setMessage([...messages, { username: userName, message: input }]);
        setInput('');
    }

    return (
        <div>
            <section className='hero'>
                <nav>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
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
            </section>
        </div>
    )
}

export default Home
