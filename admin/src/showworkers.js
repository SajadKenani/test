import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


import { useRef } from 'react';

function Show() {

  const [myvalue, setmyvalue] = useState(null);
  const [loaded, useloaded] = useState(false);
  const [errorloading, useerrorloading] = useState(false);

  const [myid, setmyid] = useState(0)
  const [edit, setedit] = useState(false)
  const [selectednum, useselectednum] = useState(0);

  const [object, setobject] = useState();
  const [myobject, setmyobject] = useState();

  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const arabicMonths = ["", "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];


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
      useloaded(true)
    } catch (error) {
      console.error('Error fetching file content from repository:', error);
      useerrorloading(true)
      useloaded(false);
      setmyvalue(false)
      return null;

    }
  }
    useEffect(() => {
      fetchFileContentFromRepository()
    }, [])

    const myInfo = JSON.parse(myvalue)

    console.log(JSON.stringify(myInfo))
    let priceDecision = [];

    for (let i = 0; i < 100; i++) {
        priceDecision.push(i);
    }
    const currentDate = new Date();
    const currentMonthNumber = currentDate.getMonth();

    const [monthnum, usemonthnum] = useState(currentMonthNumber + 1);



    async function sendDataToRepository(data) {
      try {
        const octokit = new Octokit({
          auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN  // Replace with your GitHub personal access token
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

        useloaded(true)
        
        console.log('Data sent to repository successfully:', sendingFile.data);
        setobject([]);
      } catch (error) {

        useerrorloading(true)
        useloaded(false);
        setmyvalue(false)
      }
    }

    const deleteSpecificItem = async (index) => {

      myInfo.splice(index, 1); // Corrected the splice parameters

      await sendDataToRepository(JSON.stringify(myInfo)); // Wait for this function to complete
      fetchFileContentFromRepository()
      setedit(false)
    };

    
    const [myarray, setmyarray] = useState()
    const sliderRef = useRef(null);

    const PrevButton = () => { // Use PascalCase for component names
      return (
        <button 
          onClick={() => { 
            usemonthnum(prevMonth => prevMonth >  1 ? prevMonth - 1 : prevMonth);  
            sliderRef.current.slickPrev(); 
          }}
          className='p-3 bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full flex items-center justify-center'
          style={{ width: "40px", height: "40px" }} // Adjust width and height
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>


      );
    };

    const NextButton = () => { // Use PascalCase for component names
      return (
        <button 
          onClick={() => { 
            usemonthnum(prevMonth => prevMonth < 12 ? prevMonth + 1 : prevMonth); 
            sliderRef.current.slickNext();
          }}
          className='p-3 bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full flex items-center justify-center'
          style={{ width: "40px", height: "40px" }} // Adjust width and height
        >
           <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );
    };

    const settings = {
      speed: 0,
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: currentMonthNumber,
      nextArrow: <NextButton />,
      prevArrow: <PrevButton />, // Use PascalCase for component names
    };
    

  return (
<div className="App lg:p-10 " style={{width: "100%"}}>

{ edit && 

<div className='flex justify-start' style={{ position: "fixed", width: "100%", height: "100%", zIndex: "4832765765756756558234658234" }}>
  
  <div className="scrollable-div " style={{ backgroundColor: "white",  height: "80%", marginTop: "60px", boxShadow: "0px 0px 10px 3px #07070744", borderRadius: "10px", overflowY: "auto", zIndex: "242343243243243", backgroundColor: "#023A48" }}>
  <div style={{backgroundColor: "red", color: "white", position: "absolute", borderRadius: "50%", width: "30px", height: "30px", margin: "-10px", padding: "2px", cursor: "pointer", zIndex: "9999999"}} onClick={() => {setedit(false); window.location.reload()}}> X </div>
    <div style={{ width: "100%", backgroundColor: "#023A48", paddingTop: "100px", display: "flex" }}>
      
      {loaded ?
        myInfo.filter(item => item.id === myid)
          .map((item, index) => (
            <div key={"item-"} className="col-lg-8 lg:flex grid mt-3 pb-20 lg:pl-20" style={{ borderRadius: "10px"}}>
     
              <div className=" bg-white" style={{ cursor: "pointer", boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.333)", backgroundColor: "white", borderRadius: "10px", width: "100%" }}>
                <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px", width: "100%", height: "500px", objectFit: "cover" }} />
                <div className="card-body" style={{ backgroundColor: "white" }}>
                  <h4 className="card-title" style={{ color: "black", fontWeight: "900", fontSize: "20px", fontFamily: "Tajawal" }}>{localStorage.getItem("language") === "English" ? item.nameEnglish : item.nameArabic}</h4>
                  <div className="row">
                    <div className="col">
                      <div className="card-text">
                        <div className="row">
                          <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal", fontWeight: "900" }}><h6 className="card-subtitle m-2 mt-0 text-gray">{item.age}</h6></div>
                          <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? item.religion : item.religionArabic}</h6></div>
                          {item.arabic === "1" && <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Arabic" : "عربي"}</h6></div>}
                          {item.english === "1" && <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "English" : "انجليزي"}</h6></div>}
                          {item.week === "1" && <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Daily" : " يومي"}</h6></div>}
                          {item.forever !== "0" && <div className="m-1" style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{item.forever + " IQR"}</h6></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 mt-10 lg:mt-0">
                {item.week === "1" && (
                  <>
                    <div className="flex justify-center text-white ">
                      <h1 className="text-white text-2xl mb-4 text-left" style={{fontFamily: "Tajawal"}}> {localStorage.getItem("language") === "English" ? months[monthnum] : arabicMonths[monthnum]}</h1>
                    </div>
                  </>
                )}

                <div className="flex">
                  {!myarray && setmyarray(item.calender)}
                  <Slider {...settings} ref={sliderRef} className='mySlider' style={{ display: "flex", margin: "14px", justifyContent: "left" }}>
                    {item.calender.map((month, index) => (
                      <div key={index} className="month-slide flex justify-start">
                        {month.map((day, i) => (
                          <>
                            {day === 1 ?
                              <div
                                key={i}
                                style={{ display: "inline-block", width: "40px", margin: '2px' }} // Adjust the width here
                                id={`para-${i}-${index}`}
                                onClick={() => {
                                  const id = `para-${i}-${index}`;
                                  const element = document.getElementById(id);
                                  if (item.calender[index][i] === 1) {
                              
                                    if (myarray[index][i] === 1){

                                    myarray[index][i] = 0; // Set the value to 1 when adding the "selected" class
                                    element.classList.add("selected");
                                    useselectednum(selectednum + 1);
                                  }else{
                                    myarray[index][i] = 1; // Set the value to 1 when adding the "selected" class
                                    element.classList.remove("selected");
                                    useselectednum(selectednum - 1);
                                  }


                                    const myObject = {
                                      id: item.id,
                                      isRented: "1",
                                      nameArabic: item.nameArabic,
                                      nameEnglish: item.nameEnglish,
                                      age: item.age,
                                      arabic: item.arabic,
                                      english: item.english,
                                      religion: item.religion,
                                      religionArabic: item.religionArabic,
                                      image: item.image,
                                      week: item.week,
                                      forever: item.forever,
                                      calender: myarray,
                                    };
                                    myInfo.push(myObject);
                                    const indexToRemove = myInfo.findIndex((info) => info.id === item.id);
                                    if (indexToRemove !== -1) {
                                      myInfo.splice(indexToRemove, 1);
                                    }
                                    setobject([...myInfo]);

                                  } 
                                    
                                }}
                                className="p-2 rounded cursor-pointer flex justify-center items-center border text-white border-white"
                              >
                                {i + 1}
                              </div>
                              :
                              <div

                                key={i}
                                style={{margin: "2px", display: "inline-block", width: "40px" }} // Adjust the width here
                                id={`para-${i}-${index}`}
                                onClick={() => {
                                  const id = `para-${i}-${index}`;
                                  const element = document.getElementById(id);
                                  if (item.calender[index][i] === 0) {
                                   
                                    
                                    if (myarray[index][i] === 0){

                                      myarray[index][i] = 1; // Set the value to 1 when adding the "selected" class
                                      element.classList.add("selected");
                                      useselectednum(selectednum + 1);
                                    }else{
                                      myarray[index][i] = 0; // Set the value to 1 when adding the "selected" class
                                      element.classList.remove("selected");
                                      useselectednum(selectednum - 1);
                                    }
                                    const myObject = {
                                      id: item.id,
                                      isRented: item.isRented,
                                      nameArabic: item.nameArabic,
                                      nameEnglish: item.nameEnglish,
                                      age: item.age,
                                      arabic: item.arabic,
                                      english: item.english,
                                      religion: item.religion,
                                      religionArabic: item.religionArabic,
                                      image: item.image,
                                      week: item.week,
                                      forever: item.forever,
                                      calender: myarray,
                                    };
                                    myInfo.push(myObject);
                                    const indexToRemove = myInfo.findIndex((info) => info.id === item.id);
                                    if (indexToRemove !== -1) {
                                      myInfo.splice(indexToRemove, 1);
                                    }
                                    setobject([...myInfo]);
                                  }
                                }}
                                className="p-2 rounded cursor-pointer flex justify-center items-center border text-black border-white"
                              >
                                {i + 1}
                              </div>
                            }
                          </>
                        ))}
                      </div>
                    ))}
                  </Slider>
                </div>
                {item.week === "1" &&
                  <div className="flex  mt-4" style={{width: "100%"}} >
                    <button onClick={async() => {
                
                const myfunction = async () => {
                  const fileContent = await fetchFileContentFromRepository(); // Fetch file content
                  const theObject = {
                    id: item.id,
                    isRented: "0",
                    nameArabic: item.nameArabic,
                    nameEnglish: item.nameEnglish,
                    age: item.age,
                    arabic: item.arabic,
                    english: item.english,
                    religion: item.religion,
                    religionArabic: item.religionArabic,
                    image: item.image,
                    week: item.week,
                    forever: item.forever,
                    calender:  [ 
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
                    ], // Your calendar data
                  };
                
                  // Manipulate myInfo array
                  myInfo.push(theObject);
                  const indexToRemove = myInfo.findIndex((info) => info.id === item.id);
                  if (indexToRemove !== -1) {
                    myInfo.splice(indexToRemove, 1);
                  }
           
                
                  // Update myobject
                  setmyobject([...myInfo]);
                
                  // Check if myobject has a value, if not, call myfunction again
                  if (!myobject) {
                    setTimeout(myfunction, 1000); // Call myfunction again after 1 second
                  }
                };
                
                // Initial call to myfunction
                myfunction();
                
                // Sending data to repository when myobject gets a value
                if (myobject) {
                 await sendDataToRepository(JSON.stringify(myobject));
                  window.location.reload()
                
                }
                    }} 
                      className='m-2  py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none' >
            {localStorage.getItem("value") === "English" ? "Reset and cancel order" : "اعادة تعيين والغاء الطلب" } 
          </button>

         {selectednum > 0 ?
         <button onClick={async() => {await sendDataToRepository(JSON.stringify(object)); 
        setTimeout(() => {
          fetchFileContentFromRepository();
         }, 100);
         setTimeout(() => {
          fetchFileContentFromRepository();
         }, 100); 


          }} className='m-2 col-span-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none'>
            {localStorage.getItem("value") === "English" ? "Send" : "ارسال"}
          </button>
          :
          <button  className='m-2 col-span-4 py-2 px-4 bg-green-900 text-white rounded focus:outline-none'>
          {localStorage.getItem("value") === "English" ? "Send" : "ارسال"}
        </button>
          }
                  </div>
                }
              </div>
              
            </div>
          ))
        :
        <h1>Loading</h1>
      }
      {errorloading &&
        <h1>There's a problem!</h1>
      }
    </div>
  </div>
</div>
}



  <div style={{marginTop: "10px", color: "#023A48"}}>
    <h1 className='lg:text-left' style={{ fontSize: "40px", fontFamily: "Tajawal", fontWeight: "999"}}> {localStorage.getItem("value") === "English" ? "Control panel" : "لوحة التحكم" } </h1>
    <p className='lg:text-left' style={{marginTop: "-5px", marginLeft: "3px", fontSize: "20px", fontFamily: "Tajawal"}} > {localStorage.getItem("value") === "English" ? "You can control the website from here" : "يمكنك التحكم في الموقع الالكتروني من هنا" } </p>
  </div>

  <div style={{width: "100%", height: '1px', backgroundColor: "#023A48"}}></div>

  {loaded ?
  
  <div className="row p-3 ">
  {myInfo &&
    myInfo.map((item, index) => (
     
      
    item.calender === "0" ?    
     <div key={"item-" + index}  className="col-lg-3 mt-3 " style={{cursor :"pointer", width: "100%"}} >
    <div className="card" >
      <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px", width: "100%", height: "250px", objectFit: "cover" }} />
      <div className="card-body">
        <h4 className="card-title" style={{ color: '#464646', fontFamily: "Tajawal" }}>{localStorage.getItem("value") === "English" ? item.nameEnglish : item.nameArabic }</h4>
        <div className="row">
          <div className="col">
            <div className="card-text">
            <div className="row">
  
      <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{item.age}</h6> </div>
  
      <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? item.religion : item.religionArabic} </h6></div>
  
      {item.arabic === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted"> {localStorage.getItem("value") === "English" ? "Arabic" : "عربي"}</h6></div>}
  
      {item.english === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "English": "انجليزي" }</h6></div>}
  
      {item.week === "1" &&<div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "Daily" : " يومي" }</h6></div>}
  
      {item.forever != "0" &&<div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{item.forever + " IQR"}</h6></div>}
      {item.isRented === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "Ordered" : " تم الطلب" }</h6></div> }
  </div>
  
            </div>
          </div>
        </div>
        <button onClick={() => deleteSpecificItem(index)} className="btn btn-danger mt-2 m-2" style={{fontFamily: "Tajawal"}}>
         {localStorage.getItem("value") === "English" ? "Delete" : "حذف"}
        </button>

      </div>
    </div>
  </div>
  :
  <div key={"item-" + index}  className="col-lg-3 mt-3" style={{cursor :"pointer", width: "100%"}} >
  <div className="card" style={{cursor: "pointer"}}  onClick={() => {setmyid(Number(item.id)); setedit(true)}}>
    <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px", width: "100%", height: "250px", objectFit: "cover" }} />
    <div className="card-body">
      <h4 className="card-title" style={{ color: '#464646', fontFamily: "Tajawal" }}>{localStorage.getItem("value") === "English" ? item.nameEnglish : item.nameArabic }</h4>
      <div className="row">
        <div className="col">
          <div className="card-text">
          <div className="row">

    <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{item.age}</h6> </div>

    <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? item.religion : item.religionArabic} </h6></div>

    {item.arabic === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted"> {localStorage.getItem("value") === "English" ? "Arabic" : "عربي"}</h6></div>}

    {item.english === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}><h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "English": "انجليزي" }</h6></div>}

    {item.week === "1" &&<div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "Daily" : " يومي" }</h6></div>}

    {item.forever != "0" &&<div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{item.forever + " IQR"}</h6></div>}
    {item.isRented === "1" && <div className='m-1' style={{border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal"}}> <h6 className="card-subtitle m-2 mt-0 text-muted">{localStorage.getItem("value") === "English" ? "Ordered" : " تم الطلب" }</h6></div> }
</div>

          </div>
        </div>
      </div>
      <button onClick={() => deleteSpecificItem(index)} className="btn btn-danger mt-2 m-2" style={{fontFamily: "Tajawal"}}>
       {localStorage.getItem("value") === "English" ? "Delete" : "حذف"}
      </button>

    </div>
  </div>
</div>



))}
</div>
:
<h1>
  Loading
</h1>


}

{errorloading && 
<h1> There's a problem! </h1>}


  
</div>


)
  }

export default Show;
