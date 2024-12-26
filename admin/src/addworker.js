import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';


import { religions } from './religion';
import { Link   } from 'react-router-dom';
import {  useHistory   } from "react"


function Add() {

const [selectarabic, useselectarabic] = useState("0");    
const [selectenglish, useselectenglish] = useState("0");

const [selectever, useselectever] = useState("0");
const [selectweek, useselectweek] = useState("0");
const [selectall, useselectall] = useState("0");

const [selectedReligion, setSelectedReligion] = useState("Christianity");
const [selectedReligionarabic, setselectedreligionarabic] = useState("المسيحية")

const [selectedage, setSelectedage] = useState('18');

const handleReligionChange = (event) => {
  if(localStorage.getItem("value") === "English"){

    setSelectedReligion(event.target.value);

    setselectedreligionarabic(religions[event.target.value])
  }else {

    setselectedreligionarabic(event.target.value);

   function findKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// Assuming event.target.value holds the value you're looking for

// Usage example:
const valueToFind = event.target.value;
const key = findKeyByValue(religions, valueToFind);

// Now you can set the selected religion using setSelectedReligion
setSelectedReligion(key);
  }

  };

  const handleAgeChange = (event) => {
    setSelectedage(event.target.value);

  };

  const [myvalue, setmyvalue] = useState(null);

  const fetchFileContentFromRepository = async () => {
    try {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN 
      });
  
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js' // Specify the path to your file
      });
        // Decode base64 content to get the actual file content
        const content = response.data.content;
  
        // Decode base64 content to get the actual file content
        const decodedContent = decodeURIComponent(escape(atob(content)));
    
        console.log(decodedContent);
        setmyvalue(decodedContent);
    } catch (error) {
      console.error('Error fetching file content from repository:', error);
      return null;
    }
  }

    async function sendDataToRepository(data) {
      try {
        const octokit = new Octokit({
          auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN 
        });

            // Convert the data string to a Uint8Array using TextEncoder
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);

        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner: 'SajadKenani',
          repo: 'database',
          path: 'data.js' // Specify the path to your file
        });

        // Update the file content with the new data
        const sendingFile = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: 'SajadKenani',
          repo: 'database',
          path: 'data.js', // Specify the path to your file
          message: 'my commit message',
          committer: {
            name: 'Monalisa Octocat',
            email: 'octocat@github.com'
          },
          content: btoa(String.fromCharCode.apply(null, uint8Array)),
          sha: response.data.sha,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },

        });
        
        console.log('Data sent to repository successfully:', sendingFile.data);
      } catch (error) {
        console.error('Error sending data to repository:', error);
      }
    }
    useEffect(() => {
      fetchFileContentFromRepository()
    }, [])

    const myInfo = JSON.parse(myvalue)

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e) => {
      document.getElementById("input").innerHTML = "Uploaded";
      setaddedImage(true)
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=2ff6bc30fd21dc7cf4fa7027a74b3fdc', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 200) {
        setImage(data.data.url);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const getDataReady = async (event) => {
    event.preventDefault();
    if (selectall === "1"){
      let mySideObject = []
      for(let i = 0; i < 2; i++){
        mySideObject = [{
          id: Math.floor(Math.random() * (999 - myInfo.length + 1)) + myInfo.length,
          isRented: "0",
          nameArabic: document.getElementById("nameArabic").value,
          nameEnglish: (document.getElementById("nameEnglish").value).charAt(0).toUpperCase() + (document.getElementById("nameEnglish").value).slice(1),
          age: selectedage,
          arabic: selectarabic,
          english: selectenglish,
          religion: [selectedReligion],
          religionArabic: [selectedReligionarabic],
          image: image,
          week: selectweek,
          forever: "0",
          calender: [ 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],  
          ]
        }, 
        {
          id: Math.floor(Math.random() * (999 - myInfo.length + 1)) + myInfo.length,
          isRented: "0",
          nameArabic: document.getElementById("nameArabic").value,
          nameEnglish: (document.getElementById("nameEnglish").value).charAt(0).toUpperCase() + (document.getElementById("nameEnglish").value).slice(1),
          age: selectedage,
          arabic: selectarabic,
          english: selectenglish,
          religion: [selectedReligion],
          religionArabic: [selectedReligionarabic],
          image: image,
          week: "0",
          forever: document.getElementById("myPriceInput") ? document.getElementById("myPriceInput").value : "0",
          calender: "0"
          
        }]

      }
      myInfo.push(mySideObject[0]);
      myInfo.push(mySideObject[1]);

   
        await sendDataToRepository(JSON.stringify(myInfo)); 

        
     
      }else {
        let myObject = {}

        if (selectever === "1"){
           myObject = {
            id: Math.floor(Math.random() * (999 - myInfo.length + 1)) + myInfo.length,
            isRented: "0",
            nameArabic: document.getElementById("nameArabic").value,
            nameEnglish: (document.getElementById("nameEnglish").value).charAt(0).toUpperCase() + (document.getElementById("nameEnglish").value).slice(1),
            age: selectedage,
            arabic: selectarabic,
            english: selectenglish,
            religion: [selectedReligion],
            religionArabic: [selectedReligionarabic],
            image: image,
            week: "0",
            forever: document.getElementById("myPriceInput") ? document.getElementById("myPriceInput").value : "0",
            calender: "0"
          
          };
        }
        else {
         myObject = {
          id:  Math.floor(Math.random() * (999 - myInfo.length + 1)) + myInfo.length,
          isRented: "0",
          nameArabic: document.getElementById("nameArabic").value,
          nameEnglish: (document.getElementById("nameEnglish").value).charAt(0).toUpperCase() + (document.getElementById("nameEnglish").value).slice(1),
          age: selectedage,
          arabic: selectarabic,
          english: selectenglish,
          religion: [selectedReligion],
          religionArabic: [selectedReligionarabic],
          image: image,
          week: selectweek,
          forever: document.getElementById("myPriceInput") ? document.getElementById("myPriceInput").value : "0",
          calender: [ 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],  
        ]
        
        };
}
      myInfo.push(myObject);
      await sendDataToRepository(JSON.stringify(myInfo)); // Wait for this function to complete
    
      }
    
      window.location.href = "/";
      event.preventDefault();
    };

    const age = [];

     for (let i = 16; i <= 70; i++) {
         age.push(i);
     }

     const handleDragOver = (event) => {
      event.preventDefault();
      
    };
    
    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      handleUpload({ target: { files: [file] } });
      document.getElementById("input").innerHTML = "Uploaded";
      setaddedImage(true)
    };

    const selectedWeek = () => {
      useselectweek(prevState => (prevState === "0" ? "1" : "0"));
      useselectweek("1");
      useselectever("0");
      useselectall("0");
    }

    const selectedForever = () => {
      useselectever(prevState => (prevState === "0" ? "1" : "0"));
      useselectweek("0");
      useselectever("1");
      useselectall("0");
  
    }

    const selectedAll = () => {
      useselectall(prevState => (prevState === "0" ? "1" : "0"));

      useselectweek("1");
      useselectever("1");
    }
    
    const [addedImage, setaddedImage] = useState(false);

    const [priceInputValue, setPriceInputValue] = useState('');

    const handlePriceInputChange = (event) => {
      setPriceInputValue(event.target.value);
    };

  return (
    <div className="App lg:p-14" style={{width: "100%"}}>

    <div style={{marginTop: "10px", color: "#023A48"}}>
    <h1 className='lg:text-left' style={{fontSize: "40px", fontFamily: "Tajawal", fontWeight: "999"}}> {localStorage.getItem("value") === "English" ? "Control panel" : "لوحة التحكم" } </h1>
      <p className=' lg:text-left' style={{ marginTop: "-5px", marginLeft: "3px", fontSize: "20px", fontSize: "20px", fontFamily: "Tajawal"}} > {localStorage.getItem("value") === "English" ? "You can control the website from here" : "يمكنك التحكم بالموقع الالكتروني من هنا"} </p>
    </div>
  
    <div style={{width: "100%", height: '1px', backgroundColor: "#023A48"}}></div>

    <div className="form-container">
    <h5 style={{textAlign: "start", marginTop: "50px", fontFamily: "Tajawal", fontWeight: "999"}} >  {localStorage.getItem("value") === "English" ? "Write the names in both Arabic & English" : "اكتب الاسماء باللغتين العربية والانجليزية" } </h5>
    <div className="form-group d-flex">
    <input id="nameEnglish" type="text" style={{height: "50px"}} className="form-control m-2 " placeholder={localStorage.getItem("value") === "English" ? 'Name (in English)' : '(بالانجليزي) الاسم '} required/>
    <input id="nameArabic" type="text" style={{height: "50px"}} className="form-control m-2" placeholder={localStorage.getItem("value") === "English" ? 'Name (in Arabic)' : '(بالعربي) الاسم '} required/>
  </div>

<div style={{display: "flex", justifyContent: "center"}}>
  <div style={{width: "100%", padding: "10px"}}>
  <h5 style={{textAlign: "start", marginTop: "50px", fontFamily: "Tajawal", fontWeight: "999"}} >  {localStorage.getItem("value") === "English" ? "Upload the worker's image" : "ارفع صورة للعاملة" } </h5>
  <label
  style={{
    width: "100%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px dashed black",
    borderRadius: "5px",
    borderColor: "gray",
    cursor: "pointer",
  }}

  className='form-control'
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  id='input'
>
  <input
    type="file"
    id="img"
    name="img"
    accept="image/*"
    style={{ display: "none" }}

    onChange={handleUpload}
  />
  {localStorage.getItem("value") === "English" ? "Drag & Drop or Choose File" : "اسحب وأسقط أو اختر ملف" }
  {addedImage && 
  <div style={{marginRight: "-20px"}}><img style={{width: "180px", height: "100px",  objectFit: "cover"}} src={image} /></div>
  }
</label>
</div>
</div>

<div className="form-group">
<h5 style={{textAlign: "start", marginTop: "50px", fontFamily: "Tajawal", fontWeight: "999"}} >  {localStorage.getItem("value") === "English" ? "Choose the Duration" : "أختر المدة" } </h5>
    <div className="language-buttons d-flex justify-content-start m-2">
    <button className={selectweek === "0" ? "language-button-active" : "language-button"} style={{  outline: "none", fontFamily :"Tajawal" }} onClick={selectedWeek}>
    {localStorage.getItem("value") === "English" ? "Daily": "يومي"}
      </button>

      <button className={selectever === "0" ? "language-button-active" : "language-button"} style={{ outline: "none", fontFamily :"Tajawal" }} onClick={selectedForever}>
      {localStorage.getItem("value") === "English" ? "Purchase" : "شراء " }
      </button>

      <button className={selectall === "0" ? "language-button-active" : "language-button"} style={{ outline: "none", fontFamily :"Tajawal" }} onClick={selectedAll}>
      {localStorage.getItem("value") === "English" ? "both of them" : "مشترك" }
      </button>

      {selectever === "1" && (
        <div className='flex' style={{display: "flex"}}>

          <input
            placeholder='Price in IQD'
            style={{paddingLeft: "10px"}}
            id='myPriceInput'
            value={priceInputValue}
            onChange={handlePriceInputChange}
          />

          <p className='mt-1 ml-4'>{(Number(priceInputValue) * 1000).toLocaleString() + " IQR"}</p>

        </div>
      )}

    </div>
  </div>


  
  <div className="form-group">
  <h5 style={{textAlign: "start", marginTop: "50px", fontFamily: "Tajawal", fontWeight: "999"}} >  {localStorage.getItem("value") === "English" ? "Choose the languages" : "أختر اللغات" } </h5>
    <div className="language-buttons d-flex justify-content-start m-2">
    <button className={selectarabic === "0" ? "language-button-active" : "language-button"} style={{ outline: "none" }} onClick={() => useselectarabic(prevState => (prevState === "0" ? "1" : "0"))}>
    {localStorage.getItem("value") === "English" ? "Arabic" : "عربي" }
      </button>

      <button className={selectenglish === "0" ? "language-button-active" : "language-button"} style={{ outline: "none" }} onClick={() => useselectenglish(prevState => (prevState === "0" ? "1" : "0"))}>
      {localStorage.getItem("value") === "English" ? "English" : "أنجليزي" }
      </button>
    </div>
  </div>

  <div className="form-group">
  <h5 style={{textAlign: "start", marginTop: "50px", fontFamily: "Tajawal", fontWeight: "999"}} >  {localStorage.getItem("value") === "English" ? "Choose the Age & Religion" : "أختر الدين والعمر" } </h5>
  <div className='d-flex m-2'>
    <select id="age" className="form-control mr-3" style={{width: "70px"}} onChange={handleAgeChange} value={selectedage}>
      {age.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>

    <select id="religion" className="form-control" style={{width: "150px"}}  onChange={handleReligionChange} >
    {localStorage.getItem("value") === "English" ? 
    Object.keys(religions).map((item, index) => (
        <option key={index}>{item}</option>
    ))
    :
    Object.values(religions).map((item, index) => (
        <option key={index}>{item}</option>
    ))
}

    </select>
    </div>
  </div>



  <div className='d-flex justify-start'>
    <Link className="submit-button" onClick={getDataReady} to={"#"}>{localStorage.getItem("value") === "English" ? "Submit" : "ارسال"}</Link>
    </div>
</div>

    </div>
  );
}

export default Add;
