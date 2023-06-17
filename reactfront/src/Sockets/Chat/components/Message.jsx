import React, { Component } from 'react';



import ReactTimeAgo from 'react-time-ago'






export default function Message({ message, own }) {
  return (
     

    <div  className={own ? "d-flex flex-row justify-content-end own" : "d-flex flex-row  justify-content-start"}   >
        {/* <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
        /> */}
        <div>
            <p
            className={own ?  "small p-2 ms-3 mb-1 rounded-3  bg-primary " : "small p-2 ms-3 mb-1 rounded-3  .bg-secondary text-dark"}
          
            style={{ backgroundColor: "#f5f6f7",textAlign: "left" }}
            >
                 {message.text}
            </p>
            <p className=  {own ?     "small ms-3 mb-3 rounded-3 text-muted float-end" :   "small ms-3 mb-3 rounded-3 text-muted float-start"   } >
              <ReactTimeAgo date={ message.createdAt} locale="es-MX"/>
            </p>
        </div>
    </div>




  );
}
