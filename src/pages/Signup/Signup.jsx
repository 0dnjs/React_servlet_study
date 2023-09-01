import React, { useState } from 'react';
/** jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';

const SInputLayout = css`
    margin-bottom: 15px;
    width: 60%;
    height: 40px;

    & > input {
        width:100%;
        height: 100%;
        text-align: center;
    }
`;

function Signup(props) {
    const [ signupUser, setSignupUser ] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const handleInputChange = (e) => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitClick = () => {
        // 회원가입 요청
        const option ={
            params: {
                username: signupUser.username
            }
        }
        axios.get("http://localhost:8080/servlet_study_yerim/auth/signup/duplicate/username", option)
        .then((response) => {
            console.log(response);
        })
    }

    return (
        <>
            <h1>회원가입</h1>
            <div css={SInputLayout}>
                <input type="text" name='username' placeholder='username' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="password" name='password' placeholder='password' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="text" name='name' placeholder='name' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="text" name='email' placeholder='email' onChange={handleInputChange}/>
            </div>
            <div>
                <button onClick={handleSubmitClick}>가입하기</button>
            </div>
        </>
    );
}

export default Signup;