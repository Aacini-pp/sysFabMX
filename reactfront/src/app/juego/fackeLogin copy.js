import React from 'react';
import axios from 'axios'

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

// urlfakegame = https://poki.com/es/g/tingly-bubble-shooter

const CompFakeLogin= () => {

    const scrollRef = React.useRef();

    useEffect(() => {
        bajarAdiv();
      }, [ ]);
    




      const  bajarAdiv  = () =>{
        if(scrollRef.current)
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
     } 

    return (
        <div className="m-3 row text-justify justify-content-center">
            <div className="m-3 col-10 text-justify">
               
                <iframe   height="600px" width="1050px" id="game-element" allowfullscreen="" allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share" name="gameFrame" scrolling="no" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads" src="https://games.poki.com/458768/0c537641-0c4c-40d8-bc71-19ff7fccfe1a?tag=pg-v3.92.0&amp;site_id=52&amp;iso_lang=es&amp;country=MX&amp;poki_url=https://poki.com/es/g/bubble-shots&amp;categories=7,102,103,254&amp;experiment=control-9c9a18bd&amp;special_condition=landing" title="Game" className="sc-1bxux5k-0 iIEDab"></iframe>
                
            </div>
                <div  ref={scrollRef} >     </div>
        </div>
    )
}


export default CompFakeLogin