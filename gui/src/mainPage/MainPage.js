import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './mainPage.css'

const server="http://localhost:8080"

function MainPage(){
    const[notes,setNotes]=useState([{}])
    const[state,setState]=useState({query:'',list:[]})
    const[stateC,setStateC]=useState('') //state ul pentru click
    const[newElem,setElem]=useState({})
    const navigate=useNavigate()

    const getNotes=async()=>{
        //again id ul nu trebuie sa fie hardcodat
        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`)
        const data=await res.json()
        setNotes(data)
    }

    const showNote=(e)=>{
        if(e!=undefined){
            setStateC('clicked')
            let noteFound=notes.filter(elem=>elem.title===e.target.innerHTML)
            return(
                <div>
                    <input type='text' value={noteFound.title}/>
                    <input type='text' value={noteFound.content}/>

                </div>
            )  
        }
        
    }

    const addDiv=()=>{
        return notes.map((e)=>{
            return(
                <div className='note' onClick={showNote}>{e.title}</div>
            )
        })
    }

    const addNote=async()=>{

        const res=await fetch(`${server}/api/users/14d97ab7-d59f-4b9f-a16b-29c2b3806694/notes`,
        {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },body:JSON.stringify(newElem)
        })
        .then(console.log("note added into db"))
        getNotes()
    }

    const newNote=(e)=>{

        let titlu=document.getElementsByClassName('title')[0].value,
            continut=document.getElementsByClassName('noteC')[0].value

            newElem.title=titlu
            newElem.content=continut
            newElem.dateCreated='05/01/2023'


            setElem(newElem)
            addNote()
            document.getElementsByClassName('title')[0].value=''
            document.getElementsByClassName('noteC')[0].value=''

    }

    

    const addEditableDiv=()=>{
        return (
            <div>
                <input className='title' type="text" placeholder='Title..' />
                <input className='noteC' type="text" placeholder='Lorem ipsum..'/>
                <button onClick={newNote}>Save note</button>
            </div>
            
        )
    }

    const handleChange=(e)=>{
        const results=notes.filter(note=>{
            if(e.target.value===""){
                return notes
            }else{
                return note.title.toLowerCase().includes(e.target.value.toLowerCase())
            }    
        })
        
        setState({query: e.target.value, list:results}) //every time the use types in the search bar, the state is updated
    }

    const handleClick=(e)=>{
    }

    const toAccount=()=>{
        navigate('/userPage')
    }

    

    useEffect(()=>{
        getNotes()
    },[])

    return(
        <div className="mainPage">
            <div className="div">
                <ul>
                    <li><a onClick={handleClick}>Add note</a></li>
                    <li className='account'><a onClick={toAccount}>My account</a></li>
                </ul>
            </div>

            <table className="content">
                <tr>
                    <th className='groupN'>portiunea unde isi grupeaza notitele</th>
                    <th className='notes'>
                        {/* handle cazul in care utilizatorul cauta cv ce nu exista */}
                        <input type="text" placeholder="Search" onChange={handleChange}/>
                        {(state.query===''?addDiv():state.list.map(note=>{
                            return <div>{note.title}</div>
                        }))}
                    </th>
                    <th className='contentN'>
                        {addEditableDiv()}
                    </th>

                </tr>
            </table>
            
        </div>
    )



}

export default MainPage