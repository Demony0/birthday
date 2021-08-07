import React,{useState,useEffect} from 'react'
import './addBirthday.css'

const url =  'http://localhost:5000/reminders'
function AddBirthDay() {
    const [id,setId] = useState(new Date().getTime().toString())
    const [data,setData] = useState([])
    const [userInput,setUserInput] = useState({firstName:'',date:'',id:id})
    

    const handleInput = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setId(new Date().getTime().toString())
        setUserInput({...userInput,[name]:value,id:id})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(userInput.firstName && userInput.date){
            setData([...data,userInput])
            setUserInput({firstName:'',date:'',id:id})
            addDatabase()
        }
    }

    const addDatabase = async()=>{
        await fetch(url,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify(userInput)
        }) 
    }

    const database = async () =>{
        const res = await fetch(url)
        const response = await res.json()
        setData(response)
    }

    const removeItem= async(id)=>{
        const newData = data.filter((info)=>info.id!==id)
        setData(newData)
        const res = await fetch(`${url}/${id}`,{
            method:'DELETE'
        })
        res.status === 200 ? database() : window.alert('DELETED')
    }

    useEffect(()=>{
        database()
    },[])

    
    const UpdateBirthday =()=> {
        return (
            <section>
                {data.map((info)=>{
                    const {id,firstName,date}=info
                    return <div 
                        className={ date === new Date().toISOString().slice(0,10) ? 'container-notify': 'container-profile' } 
                        key={id}>
                        <h4>Name:<div>{firstName}</div></h4>
                        <h4>Birthday:<div> {date} </div></h4>
                        <button className='btn-remove' onClick={()=>removeItem(id)}>Remove Item</button>
                    </div>
                })}
            </section>
        )
    }


    return (
        <section>
            <form>
                <div className='container-input'>
                    <label><h3>Name:</h3></label>
                    <input 
                        name='firstName' 
                        type='firstName' 
                        id='firstName' 
                        value={userInput.firstName} 
                        onChange={handleInput}/>
                </div>
                <div className='container-input'>
                    <label><h3>Remind:</h3></label>
                    <input 
                        name='date' 
                        type='date' 
                        id='date' 
                        value={userInput.date} 
                        onChange={handleInput}/>
                </div>
                <button id='submit' onClick={handleSubmit} className='btn-add'>SUBMIT</button>
            </form>
            <UpdateBirthday/>
        </section>
    )
}

export default AddBirthDay
