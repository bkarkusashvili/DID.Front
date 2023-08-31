import React, { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';
import googleSvg from './img/google.svg';

function SignIn() {
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setLoginUrl(data.url))
            .catch((error) => console.error(error));
    }, []);

    // Define inline styles
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: ' 20px',
        backgroundColor: 'white',
        color: '#444',
        padding: '10px 20px',
        borderRadius: '5px',
        border: ' 1px solid black',
        textDecoration: 'none',
        cursor: 'pointer',
        marginBottom: ' 20px'
    };
    const buttonStyleNoUrl = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: ' 20px',
        backgroundColor: 'white',
        color: '#8f8c83',
        padding: '10px 20px',
        borderRadius: '5px',
        border: ' 1px solid black',
        textDecoration: 'none',
        cursor: 'pointer',
        marginBottom: ' 20px'
    }

    const imageStyle = {
        marginRight: '10px',
        width: '24px',
        height: '24px',
    };

    return (
        <div>
            {loginUrl != null ? (
                <a href={loginUrl} style={buttonStyle}>
                    <img src={googleSvg} alt="Google Sign In" style={imageStyle} />
                    Google Sign In
                </a>
            ):
            (
                <a  style={buttonStyleNoUrl}>
                <img src={googleSvg} alt="Google Sign In" style={imageStyle} />
                Google Sign In
            </a>
            )}
        </div>
    );
}

export default SignIn;
