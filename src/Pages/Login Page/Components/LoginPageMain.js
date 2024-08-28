import React, { useEffect, useState } from 'react'
import '../../../css/LoginPage/LoginPageMain.css'
import img1 from '../../../Resources/davlogo-removebg-preview.png'
import img2 from '../../../Resources/otpLogo.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFId } from '../../../redux/reducers/freducers'

export default function LoginPageMain() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    let otpinputcounter = 0;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState();

    var errorCounter;
    let randomnum;
    const sendMail = async () => {
        randomnum = getRandomNumber(100000, 999999);
        let data = {
            email: email,
            otp: randomnum,
        };
        const res = await fetch(`http://localhost:4000/sendmail`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        });
    }

    const checkcredential = async () => {
        // console.log(document.getElementById('flexSwitchCheckDefault').checked);

        let data = {
            email: email,
            password: password,
            admin: document.getElementById('flexSwitchCheckDefault').checked
        }

        let res = await fetch(`http://localhost:4000/verifycredential`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })

        res = await res.json();

        if (res.msg == "success") {
            sendMail();
            enableotpbox();
            console.log("Invalid user");
        } else {
            errorCounter += 2;
            console.log("Invalid user");
            let elements = document.getElementsByClassName('loginformtextfield');
            let errorElements = document.getElementsByClassName('errormessage');
            let emailError = document.getElementById('emailerror');
            elements[0].style.borderLeft = "5px solid red";
            errorElements[0].style.visibility = "visible"
            errorElements[0].innerHTML = "Invalid Credentials"
            elements[1].style.borderLeft = "5px solid red";
            errorElements[1].style.visibility = "visible"
            errorElements[1].innerHTML = "Invalid Credentials"
        }
    }
    const formDisplay = async () => {
        let data = {
            email: email,
            password: password
        }
        let res = await fetch(`http://localhost:4000/checkforfirsttime`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })
        res = await res.json();
        if (res.msg === "newuser") {
            //re-direct to form
            dispatch(setFId(res.fid))
            navigate("/userdetails")
        }
        else {
            //re-direct to dashboard
            navigate("/dashboard")
        }
        console.log(res);

    }
    const checkotp = () => {
        let userenteredotp = null;
        let elements = document.getElementsByClassName('otptextfield');
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i].value;
            if (i == 0) {
                userenteredotp = element;
            } else {
                userenteredotp = userenteredotp + "" + element
            }
        }
        if (userenteredotp == randomnum) {
            formDisplay();
        } else {
            console.log("Invalid");
        }
    }

    const loadformsection = () => {
        let loginbox = document.querySelector(".loginpageformcontainerdiv2info");
        loginbox.style.display = "flex";
        let otpbox = document.querySelector(".loginpageformcontainerdiv3info");
        otpbox.style.display = "none";
        setEmail("");
        setPassword("");
    }

    const enableotpbox = () => {
        let loginbox = document.querySelector(".loginpageformcontainerdiv2info");
        loginbox.style.display = "none";
        let otpbox = document.querySelector(".loginpageformcontainerdiv3info");
        otpbox.style.display = "flex";
    }

    const validateDetails = () => {
        errorCounter = 0;
        let elements = document.getElementsByClassName('loginformtextfield');
        let errorElements = document.getElementsByClassName('errormessage');
        let emailError = document.getElementById('emailerror');
        let checkbox = document.getElementById('flexSwitchCheckDefault');

        console.log();

        if (elements[0].value === "") {
            errorCounter++;
            elements[0].style.borderLeft = "5px solid red";
            errorElements[0].style.visibility = "visible"
            errorElements[0].innerHTML = "This is a required field"
        }
        else if (!elements[0].value.includes("@") || !elements[0].value.includes(".com")) {
            console.log("control");
            errorCounter++;
            elements[0].style.borderLeft = "5px solid red"
            emailError.style.visibility = "visible"
            emailError.innerHTML = "Please Enter a valid Email"
        }
        else {
            elements[0].style.borderLeft = "5px solid #0376d4";
            errorElements[0].style.visibility = "hidden"
        }

        if (elements[1].value === "") {
            errorCounter++;
            elements[1].style.borderLeft = "5px solid red";
            errorElements[1].style.visibility = "visible"
            errorElements[1].innerHTML = "This is a required field"
        } else {
            elements[1].style.borderLeft = "5px solid #0376d4";
            errorElements[1].style.visibility = "hidden"
        }

        if (errorCounter === 0) {
            checkcredential();
        }
    }



    const changeotpinput = (e) => {
        const elements = document.getElementsByClassName("otptextfield");
        try {
            if (e.keyCode === 8) {
                if (e.target.value === "") {
                    if (otpinputcounter > 0) {
                        otpinputcounter--;
                        elements[otpinputcounter].focus();
                    }
                }
            } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                if (otpinputcounter < 5) {
                    ++otpinputcounter;
                    elements[otpinputcounter].focus();
                }
            }
        } catch (error) {

        }
    }

    return (
        <div className="loginpagemaincontainer">
            <div className="loginpageformcontainer">
                <div className="loginpageformcontainerdiv1">
                    <div className="loginpageformcontainerdiv1info">
                        <img src={img1} id='img1' alt="" />
                        <label>Ramanand Arya D.A.V College <p>(Autonomous)</p> </label>
                    </div>
                </div>
                <div className="loginpageformcontainerdiv2">
                    <div className="loginpageformcontainerdiv2info">
                        <label className="login">Login</label>
                        <input type="email" className='loginformtextfield' value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" placeholder='Email ID' />
                        <p id='emailerror' className='errormessage'>hey</p>
                        <input type="password" className='loginformtextfield' value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" placeholder="Password" />
                        <p id='passerror' className='errormessage'>hey</p>
                        <div className="loginpageformcontainerdiv2infoadminswitch">
                            <label className="togglerText">Are you Admin ? </label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            </div>
                        </div>
                        <input type="submit" className="submit" value="SUBMIT" onClick={validateDetails} />
                    </div>
                    <div className="loginpageformcontainerdiv3info">
                        <div className="otpbackbtncontainer">
                            <div className="backtologincontainer" onClick={loadformsection}>
                                <i className="fa-solid fa-arrow-left-long"></i>
                                <p>Back to Login</p>
                            </div>
                        </div>
                        <label className='otpheading' >Verification</label>
                        <label className='otpheadingdescription'>Enter six digit OTP code sent to {email}</label>
                        <img src={img2} id='img2' alt='img2' />
                        <div className="otptextfielddiv" >
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                            <input type="number" className="otptextfield" maxLength={1} onKeyUp={(e) => { changeotpinput(e) }} />
                        </div>
                        <label className='otpresenddescription'>Didn't receive OTP code ? <a href='#' onClick={sendMail}>Resend code</a></label>
                        <button className="submit verifyotp" onClick={checkotp}>Verify & Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}