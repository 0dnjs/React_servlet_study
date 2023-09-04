import React, { useState } from 'react';
import axios from 'axios';

function Signin(props) {
    const [ signinInput, setSigninInput ] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value
        })
    }
    //async, await을 쓰면 트라이캐치 걸어주면됨
    const handleSigninClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/servlet_study_yerim/auth/signin", signinInput);
            
            if(!response.data) {
                alert("로그인 실패")
                return;
            }   
            
            alert("환영합니다");

        }catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>로그인</h1>
            <div><input type="text" name='username' onChange={handleInputChange} placeholder='username'/></div>
            <div><input type="password" name='password' onChange={handleInputChange} placeholder='password'/></div>
            <div><button onClick={handleSigninClick}>로그인</button></div>
        </>
    );
}

export default Signin;