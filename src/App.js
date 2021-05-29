import { useState, useEffect } from 'react'
import './App.css';
import db from './firebase'
import Login from './components/Login'
import Home from './components/Home'


function App() {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = () => {
    console.log('i am here')
    clearErrors()
    db.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message)
            break;
          case "auth/wrong-password":
            setPasswordError(err.message)
            break;
        }
      })
  }

  const handleSignup = () => {
    clearErrors()
    db.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/ivalid-email":
            setEmailError(err.message)
            break;
          case "auth/weak-password":
            setPasswordError(err.message)
            break;
        }
      })
  }

  const handleLogout = () => {
    console.log('i am in logout')
    db.auth().signOut();
  }

  const authListener = () => {
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs()
        setUser(user)
      } else {
        console.log('i am in else')
        setUser('')
      }
    })
    console.log('i am in authListener')
  }

  useEffect(() => {
    authListener()
    console.log(user.email)
  }, [])

  return (
    <div className="App">
      {user ? (
        <Home
          handleLogout={handleLogout}
          userName={user.email}
        />
      ) : (
        <Login
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )
      }


    </div>
  );
}

export default App;
