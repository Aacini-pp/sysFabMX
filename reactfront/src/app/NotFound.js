import React from 'react';
import axios from 'axios'

import  {useState} from 'react'
import { useNavigate } from 'react-router-dom'



const CompNotFound=()=>{



    return (
        <div >
            <h1 className="display-1"> 
                <i className="fa-solid fa-4"></i>
                <i className="fa-solid fa-0"></i>    
                <i className="fa-solid fa-4"></i>    
            </h1>
            <h3>Pagina No encontrada</h3>
        </div>
    )
}


export default CompNotFound