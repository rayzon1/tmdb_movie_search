import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'

export default function LoadingSpinner () {


    return (
        <>
            <div style={{height: '300px'}} />
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
            <div style={{height: '50vh'}}/>
        </>
    )
}