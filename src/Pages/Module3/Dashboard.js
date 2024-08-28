import React from 'react'
import davlogo from "../../Resources/davlogo-removebg-preview.png"
import profile from "../../Resources/person.jpg"
import '../../css/Module3/Dashboard.css'
import { FaRegEdit } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxActivityLog } from "react-icons/rx";
import { MdOutlineDateRange } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";


export default function Dashboard() {
  const submitActivityFormDetails = () => {
    console.log("activity form submited");

  }
  const removeactivityform = () => {
    const removeelement = document.querySelector(".activityform");
    removeelement.style.display = "none";
    const removedashboardopacity = document.querySelector('.dashboardcontainer');
    removedashboardopacity.style.opacity = "";
  }
  const addActivity = () => {
    console.log("add activity form");
    const dashboardelements = document.querySelector('.dashboardcontainer');
    dashboardelements.style.opacity = "0.3";
    const addactivity = document.querySelector('.activityform');
    addactivity.style.display = "flex";
  }

  return (
    <>
      <div className="dashboardcontainer">
        <div className='dashboardcontainerleftside'>
          <div className="dashboardcontainersidebar">
            <img src={davlogo} alt='' height={150} width={180} />
            <p>Ramanand Arya Dav College</p>
            <div className="dashboardcontainersidebarfilter">
              filter section remaining
            </div>
          </div>
        </div>
        <div className="dashboardcontainerrightside">
          <div className="dashboardcontainerheader">
            <div className="dashboardcontainerheaderprofile">
              <div className="dashboardcontainerheaderprofilepicimage">
                <img src={profile} alt='' height={170} width={200} />
              </div>
              <div className="dashboardcontainerheaderprofiledeptandname">
                <p className='name'>Nandini Vishwakarma</p>
                <p className='dept'>Department of Information Technology </p>
              </div>
            </div>
            <div className="dashboardcontainerheaderaddactivitybutton">
              <button className='addactivitybtn' onClick={addActivity}>&#10750; Add Activity</button>
            </div>
          </div>
          <div className="dashboardcontainertable">
            <table border={1} >
              <thead>
                <tr>
                  <td> Srno. </td>
                  <td> <RxActivityLog fontSize={15} /> Activity Name </td>
                  <td>  <MdOutlineUpdate fontSize={20} /> Academic year </td>
                  <td> <MdOutlineDateRange fontSize={20} /> Date </td>
                  <td> <FaMale fontSize={20} /> Male Student </td>
                  <td> <FaFemale fontSize={20} /> Female Student </td>
                  <td> <FaRegFilePdf fontSize={20} /> Uploaded File </td>
                  <td> <CiEdit fontSize={20} /> Edit</td>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td> Fastest Finger </td><td> 28-08-2024</td><td> 2024-2025</td><td> 100 </td><td> 100 </td><td><button className='file'> <RiUpload2Fill fontSize={20} color='black' /> Uploaded file </button> </td><td><button className='edit'><FaRegEdit fontSize={19} /> Edit </button>  <button className='delete'><RiDeleteBin6Line fontSize={19} /> Delete </button></td></tr>
                <tr><td>1</td><td> Fastest Finger </td><td> 28-08-2024</td><td> 2024-2025</td><td> 100 </td><td> 100 </td><td><button className='file'> <RiUpload2Fill fontSize={20} color='black' /> Uploaded file </button> </td><td><button className='edit'><FaRegEdit fontSize={19} /> Edit </button>  <button className='delete'><RiDeleteBin6Line fontSize={19} /> Delete </button></td></tr>
                <tr><td>1</td><td> Fastest Finger </td><td> 28-08-2024</td><td> 2024-2025</td><td> 100 </td><td> 100 </td><td><button className='file'> <RiUpload2Fill fontSize={20} color='black' /> Uploaded file </button> </td><td><button className='edit'><FaRegEdit fontSize={19} /> Edit </button>  <button className='delete'><RiDeleteBin6Line fontSize={19} /> Delete </button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="activityform ">
        <h1 className='addactivityformname'> Add Activity </h1>
        <div className='exitbtn' onClick={removeactivityform}> X </div>
        <div className="addactivityform">
          <div className="addactivityformrleftdiv">
            <label className='activitylabel'>Activity Name : </label> <input type="text" name="" id="" />
            <label className='activitylabel'>Activity Date : </label><input type="date" name="" id="" />
            <label className='activitylabel'>Academic year : </label>
            <select name="Academic year">
              <option value="" disabled selected hidden></option>
              <option value="2024-2025">2024 - 2025</option>
              <option value="2023-2024">2023 - 2024</option>
              <option value="2022-2023">2022 - 2023</option>
              <option value="2021-2022">2021 - 2022</option>
            </select>
          </div>
          <div className="addactivityformrightdiv">
            <label className='activitylabel'>Number of  Male Student : </label> <input type="number" name="" id="" />
            <label className='activitylabel'>Number of Female Student : </label> <input type="number" name="" id="" />
            <label className='activitylabel'>Upload File : </label> <input type="file" name="" id="" />
          </div>
        </div>
        <div className="addactivityformsubmitbutton">
          <input type="button" value="Submit" id='addactivitysubmitbtn' onClick={submitActivityFormDetails} />
        </div>
      </div>
    </>
  )
}
