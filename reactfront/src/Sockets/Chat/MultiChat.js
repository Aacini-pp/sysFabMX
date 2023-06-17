import React, { Component } from 'react';
import axios from 'axios'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


import conectarSocket from "./../Socket"



import { useAuth, getRolUruaria, getUruaria, isVoluntaria, isCoordinadora } from './../../app/funciones'






import Conversation from "./components/Conversation";

import Message from "./components/Message";
//import Message from "./components/message/Message";


//funciona con npm i mdb-react-ui-kit@5.0.0
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  //div className="overflow-scroll",
} from "mdb-react-ui-kit";

import "./MultiChat.css"

    const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"Chats/";

    const { Navbar, Nav, NavDropdown } = ReactBootstrap;



const CompMultiChat = ( props, ref ) => {


    const [conversations, setConversations] = useState(props.conversaciones);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState(""); 
    const [ search, setSearch ] = useState("")

    const scrollRef = React.useRef();
    let socket = conectarSocket()


    const results = !search ? conversations : conversations.filter((dato)=> dato.Usuaria.Nombre.toLowerCase().includes(search.toLocaleLowerCase()))
   
//enviar mensaje 
   const enviarMensaje = (e)=>{

      e.preventDefault()
    
      let msg = {
        Emisor : getUruaria(),
        Receptor: currentChat.Usuaria.id , //id  conversacion actual
        Mensage: newMessage
      }

      setNewMessage("");
     // console.log("mensaje enviado",msg);
      socket.emit('mensaje', msg)
   }


   const  selescionarConversacion  = (e,c) =>{
       c.mensajesNoleidos=0; //marcar coo leido todos los mensajes
       setCurrentChat(c)
       bajarAdiv();
    } 


    useEffect(() => { //VOLVER a leer los datos  si han cambiado 
        setConversations(props.conversaciones);
      }, [props.conversaciones]);
    


    useEffect(() => {
        bajarAdiv();
      }, [props.conversaciones,currentChat]);
    




      const  bajarAdiv  = () =>{
        if(scrollRef.current)
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
     } 
 
    
     const searcher = (e) => {
        setSearch(e.target.value)   
    }



    return (
        <div className="container-fluid"> 
 

            
            <MDBContainer fluid className="py-5" style={{ backgroundColor: "#212529" }}>
                <MDBRow>

                
                    
                    <MDBCol md="12">
                         <h1>Multichat</h1>       
                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                        <MDBCardBody>
                        
                        <MDBRow>

                            {/* chatMenu */}

                            <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                            <div className="p-3">
                                <MDBInputGroup className="rounded mb-3">
                                <input
                                    className="form-control rounded"
                                    placeholder="Buscar"
                                    type="search"
                                    value={search} onChange={searcher}
                                />
                                <span
                                    className="input-group-text border-0"
                                    id="search-addon"
                                >
                                    <MDBIcon fas icon="search" />
                                </span>
                                </MDBInputGroup>

                                <div className="overflow-scroll"
                                suppressscrollx
                                style={{ position: "relative", height: "400px" }}
                                >
                                <MDBTypography listUnStyled className="mb-0">
                              
                                        {results.map(  (c, index)  => (
                                            <div  key={index}  onClick={ (e) => selescionarConversacion(e,c) }>
                                                <Conversation  conversation={c} currentUser={c.Usuaria} />
                                            </div>
                                        ))}
                                   
                                </MDBTypography>
                                </div>
                            </div>
                            </MDBCol>


                            {/* chatBox */}

                            <MDBCol md="6" lg="7" xl="8">
                            
                                

                            {currentChat ? (
                                
                                <h1 className='text-secondary'> { currentChat.Usuaria.Nombre}</h1>
                            ) : (
                            ""
                            )}




                            

                            {currentChat ? (
                                
                                <div 
                                    suppressscrollx
                                    style={{ position: "relative", height: "400px" }}
                                    className="pt-3 pe-3 overflow-scroll"

                                    
                                        >


                                    {currentChat.mensages.map((c) => (
                                            <div ref={scrollRef}>
                                                <Message   message={c} own={c.emisor === getUruaria().id  }   />
                                            </div>
                                    ))}
                                    

                                             
                                </div>
                            ) : (
                            <h3 className="text-muted">
                                Selecione un chat
                            </h3>
                            )}

                                {/* submit chat */}
                            {currentChat ? (
                            
                            <form onSubmit={enviarMensaje} className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                               
                                                <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                alt="avatar 3"
                                                style={{ width: "40px", height: "100%" }}
                                                />
                                                <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="exampleFormControlInput2"
                                                placeholder="Escriba el mensaje"

                                                onChange={(e) => setNewMessage(e.target.value)}
                                                 value={newMessage}
                                                
                                                />
                                                    
                                                    {/*                                 
                                                <a className="ms-1 text-muted" href="#!">
                                                <MDBIcon fas icon="paperclip" />
                                                </a>
                                                <a className="ms-3 text-muted" href="#!">
                                                <MDBIcon fas icon="smile" />
                                                </a> */}

                                                <a  className="ms-3" href="#!"  onClick={enviarMensaje}  >
                                                     <MDBIcon fas icon="paper-plane" />
                                                </a>

                            </form >
                            
                            ): " "}
         




                           
                            
                            </MDBCol>
                        </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
                
            


                                       
            
        </div>

    )

}


export default CompMultiChat