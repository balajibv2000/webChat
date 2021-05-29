import React from 'react'

function Login(props) {

    const {
        email,
        password,
        setEmail,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props

    return (
        <section className='login'>
            <div className='login__container'>
                <label>Username</label>
                <input type='text' autoFocus required value={email} onChange={event => setEmail(event.target.value)} />
                <p className='errorMsg'>{emailError}</p>
                <label>Password</label>
                <input type='password' required value={password} onChange={event => setPassword(event.target.value)} />
                <p className='errorMsg'>{passwordError}</p>
                <div className='login__buttonContainer'>
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login
