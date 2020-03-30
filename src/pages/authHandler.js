import React, {useState, useEffect} from 'react';

import axios from 'axios';

import qs from 'qs';

import {useAuth} from '../components/authContext';


function  AuthHandler(props)  {
  
    const params = qs.parse(props.location.search,{ ignoreQueryPrefix: true });

    
    const [code, setCode] =  useState(params.code)
    const [token, setToken ]= useState({})


    const {setAuthTokens} = useAuth();
   

    useEffect(() => {
        console.log('effect')
      
        axios.post("/api/auth", {code: code})
        .then(result => {
            if (result.status === 200) {
               console.log(`got token from proxy ${result.data}`)
               //setToken()
              // this.setState({...this.state, token: result.data});
               setToken(result.data);
               setAuthTokens(result.data);
            } else {
                console.log("error: " + result.status);
            }
        }).catch(e => {
            console.log("error: " + e);

        });
      }, []);
    
   
      
        return (
            <div>
                <h1>auth helper</h1>
                <p>{code}</p>
                <p>{token.user_email}</p>
            </div>
        )
    

}

export default AuthHandler;