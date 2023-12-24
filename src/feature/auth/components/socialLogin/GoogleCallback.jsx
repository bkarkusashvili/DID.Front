import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../../env';

export function GoogleCallback( {updateUserId, updateToken}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    console.log("gadmovida")

    useEffect(() => {
        console.log("shemovida")
        axios.get(API + `auth/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            if (response.data) {
                updateToken(response.data.access_token);
                updateUserId(response.data.user.id);
                window.location.href = '/dashboard';
            }
        console.log("daloga")

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        console.log("daaerora")

        });

    }, []);

    return(
        <>
        loading
        </>
    )
}


//axios
// .post(API + type, data)
// .then((res) => {
//   if (!isReset) {
//     localStorage.setItem('access_token', response.data.access_token);
//     localStorage.setItem('user_id', response.data.user.id);
//     navigate('/dashboard')
//   } else {
//     setNotification(res.data.status);
//   }
// })
// .catch((err) => {
//   const res = err.response;

//   if (res.status === 422) {
//     const errors = res.data.errors;

//     Object.keys(errors).forEach((key) =>
//       helper.setFieldError(key, errors[key])
//     );
//   }
// });
// };