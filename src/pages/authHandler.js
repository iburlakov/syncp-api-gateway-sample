import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import {useAuth} from '../components/authContext';

import Loading from '../controls/loading';

function  AuthHandler(props)  {
    const code = qs.parse(props.location.search, { ignoreQueryPrefix: true }).code;

    const {token, setToken} = useAuth();
    const [error, setError] = useState();
    const [retryFlag, setRetryFlag] = useState(0);
    // TODO: do not allow to retry in case of missing code

    useEffect(() => {
        if (!!code) {
            axios.post("/api/auth", {code})
                .then(result => {
                    if (result.status === 200) {
                        setToken(result.data);
                    } else {
                        throw new Error(`Server returned ${result.status} ${result.statusText}`);
                    }
                }).catch(e => {
                    setError(e.message);
                });
        } else {
            setError("Code parameter is missing");
        }
    }, [retryFlag]);

    function onRetryClicked() {
        setError();

        setRetryFlag(retryFlag+1);

        return false;
    }
    
    if (token) {
        return (<Redirect to='/browser' />);
    } else if (error) {
        return (
            <>
            <div className='row text-center'>
                <div className='col-md'>
                    <p className="lead text-muted">Wait while you are logging in</p>
                </div>
            </div>
            <div className='row'>
                <div className="col-md alert alert-danger mx-12" role="alert">
                    {error}. <a href="#" onClick={onRetryClicked}>Retry.</a>
                </div> 
            </div>
            </>
        );
    }
    
    return ( <Loading text='Authenticating...'/> );
}

export default AuthHandler;