import React, { useEffect,useState } from 'react'
import '../../../css/Module2/Form.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Form() {

  let errorcounter;
  const navigate = useNavigate();
  const fid = useSelector((state) => state.freducers.fid)
  const [resumeFile, setResumeFile] = useState(null);

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0];
    console.log(event.target.value);
    if (event.target.files && file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64data = reader.result;
        setResumeFile(base64data);
      };
      reader.readAsDataURL(file);
    }
  }

  const insertuserdetails = async () => {
    let element = document.getElementsByClassName('formpageelements');
    let date = element[2].value.replace("-", "");
    date = date.replace("-", "");
    console.log(date);
    let data = {
      id: fid,
      department: element[1].value,
      date: date,
      photo: resumeFile,
      phone: element[4].value
    }
    let res = await fetch(`http://localhost:4000/insertuserdetails`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
    res = await res.json();
    console.log(res);
    if(res.msg=="success"){
        navigate("/dashboard");
    }
  }

  const validateFormDetails = () => {
    errorcounter = 0;
    let element = document.getElementsByClassName('formpageelements');
    let requiredmsgtext = document.getElementById('requiredmsg')
    console.log(element);
    console.log(requiredmsgtext)

    for (let i = 1; i < element.length; i++) {
      if (element[i].value === "") {
        errorcounter++;
        element[i].nextSibling.innerHTML = "This is required field"
        element[i].nextSibling.style.visibility = "visible"
        element[i].style.borderLeft = "5px solid red"
      } else {
        element[i].nextSibling.innerHTML = ""
        element[i].nextSibling.style.visibility = "hidden"
        element[i].style.borderLeft = "5px solid #0376D4"
      }
    }

    if (errorcounter == 0) {
      insertuserdetails();
    }
  }

  const fetchuserdetails = async () => {
    let data = {
      fid: fid
    }
    let res = await fetch(`http://localhost:4000/fetchuserdetails`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
    res = await res.json();
    document.getElementById('userdetailsformusername').placeholder = res.name;
  }

  useEffect(() => {
    fetchuserdetails();
  }, [])

  return (
    <div>
      <div className="formpagemaincontainer">
        <div className="formpagecontainer">
          <div className="formpageheading">
            <p>User Details</p>
          </div>
          <div className="formitem" style={{marginBottom:'25px'}}>
            <label htmlFor="">Username</label>
            <input type='text' className='formpageelements' id='userdetailsformusername' placeholder="hello" disabled />
          </div>
          <div className="formitem">
            <label htmlFor="">Department</label>
            <select name="department" className='formpageelements'>
              <option value="" disabled selected hidden>Select Department</option>
              <option value="IT">IT</option>
              <option value="Commerce">Commerce</option>
              <option value="Management">Management</option>
              <option value="Science">Science</option>
            </select>
            <p id='requiredmsg'>this</p>
          </div>
          <div className="formitem">
            <label htmlFor="">Joining Date</label>
            <input type='date' className='formpageelements' placeholder='Joining Date' />
            <p id='requiredmsg'>this</p>
          </div>
          <div className="formitem">
            <label htmlFor="">Profile Photo</label>
            <input type='file' onChange={(e) => { customBase64Uploader(e) }} className='formpageelements' accept='image/*' />
            <p id='requiredmsg'>this</p>
          </div>
          <div className="formitem">
            <label htmlFor="">Phone Number </label>
            <input type='number' className='formpageelements' placeholder='Phone No' />
            <p id='requiredmsg'>this</p>
          </div>
          <button className='formbutton' onClick={validateFormDetails}>Submit</button>
        </div>
      </div>
    </div>
  )
}
