import React from 'react'
import ReactDom from 'react-dom'
import Header from './components/header/header'
import AddBirthDay from './components/addBirthDay/addBirthDay'


const App = () =>{
    return (
        <>
            <Header />
            <AddBirthDay />
        </>
    )
}


ReactDom.render(<App/>,document.getElementById('root'))