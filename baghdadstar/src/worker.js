import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ReactDOMServer from 'react-dom/server';

export const WORKER = () => {
  const [myvalue, setmyvalue] = useState(null);
  const [loaded, useloaded] = useState(false);
  const [errorloading, useerrorloading] = useState(false);
  const [selectednum, useselectednum] = useState(0);
  const [object, setobject] = useState();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [location, setlocation] = useState("")

  const [mycalender, usemycalender] = useState( [ 
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
  ])

  const [myobject, setmyobject] = useState({})
  const [verify, useverify] = useState(true)

  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const arabicMonths = ["", "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

  const fetchFileContentFromRepository = async () => {
    try {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN
      });
  
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: "SajadKenani",
        repo: 'database',
        path: 'data.js'
      });
  
      const content = response.data.content;
      const decodedContent = decodeURIComponent(escape(atob(content)));
  
      setmyvalue(decodedContent);
      useloaded(true);
    } catch (error) {
      console.error('Error fetching file content from repository:', error);
      useerrorloading(true);
      useloaded(false);
      setmyvalue(false);
      return null;
    }
  };

  useEffect(() => {
    fetchFileContentFromRepository();
  }, []);

  const myInfo = JSON.parse(myvalue);
  let priceDecision = [];

  for (let i = 0; i < 100; i++) {
    priceDecision.push(i);
  }

  const currentDate = new Date();
  const currentYearNumber = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth();
  const currentDayNumber = currentDate.getDay();
  const [monthnum, usemonthnum] = useState(currentMonthNumber + 1);

  async function sendDataToRepository(data) {
    try {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN
      });

      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(data);

      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js'
      });

      const sendingFile = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js',
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

  const [myarray, setmyarray] = useState();
  const sliderRef = useRef(null);

  const PrevButton = () => {
    return (
      <button 
        onClick={() => { 
          usemonthnum(prevMonth => prevMonth > 1 ? prevMonth - 1 : prevMonth);  
          sliderRef.current.slickPrev(); 
        }}
        className='p-3 bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full flex items-center justify-center m-1'
        style={{ width: "40px", height: "40px" }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  };

  const NextButton = () => {
    return (
      <button 
        onClick={() => { 
          usemonthnum(prevMonth => prevMonth < 12 ? prevMonth + 1 : prevMonth); 
          sliderRef.current.slickNext();
        }}
        className='p-3 bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full flex items-center justify-center m-1'
        style={{ width: "40px", height: "40px" }}
      >
         <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  };

  const settings = {
   
    speed: 0,
    dots: false,
    infinite: false,
    arrows: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentMonthNumber,
  };
  
  function getWeekName(year, monthIndex, day) {
    const date = new Date(year, monthIndex, day);
    const dayOfWeek = date.getDay();
    const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeksArabic =  ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'];

    let verifiedNames = []

    if(localStorage.getItem("language") === "Arabic") {
      verifiedNames = weeksArabic
    }else {
      verifiedNames = weekNames
    }
    return verifiedNames[dayOfWeek];
  }

  const form = useRef();

  const sendEmail = (e, jsxContent) => {
    e.preventDefault();
    
    const htmlContent = ReactDOMServer.renderToStaticMarkup(jsxContent);
  
    emailjs
      .sendForm('service_g3difeh', 'template_n581zq9', form.current, {
        publicKey: '5ZgPHVmHfAwj5w2BZ',
        message: htmlContent,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          window.location.assign("worker/submit")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  


  const myform = useRef();

  const sendMyEmail = (e, jsxContent) => {
    e.preventDefault();
    
    const htmlContent = ReactDOMServer.renderToStaticMarkup(jsxContent);
    
    emailjs
      .sendForm('service_g3difeh', 'template_n581zq9', form.current, {
        publicKey: '5ZgPHVmHfAwj5w2BZ',
        message: htmlContent,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          sendDataToRepository(JSON.stringify(object))
          window.location.assign("worker/submit")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  
  return (
    <div className="App" style={{ width: "100%", padding: "50px", backgroundColor: "#023A48", paddingTop: "200px", paddingBottom: "200px" }}>
      {loaded ?
        myInfo.filter(item => item.id === Number(localStorage.getItem("eventId")))
       
          .map((item, index) => (
            <div key={"item-"} className="col-lg-12 lg:flex mt-3" style={{ borderRadius: "10px", width: "100%" }} >
              <div style={{width: "100%"}}>
              <div className=" bg-white" style={{ cursor: "pointer", boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.333)", backgroundColor: "white", borderRadius: "10px" }}>
                <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px",  height: "500px", objectFit: "cover" }} />
                <div className="card-body" style={{ backgroundColor: "white" }}>
                  <h4 className="card-title" style={{ color: "black", fontWeight: "900", fontSize: "20px", fontFamily: "Tajawal" }}>{localStorage.getItem("language") === "English" ? item.nameEnglish : item.nameArabic}</h4>
                  <div className="row">
                    <div className="col">
                      <div className="card-text">
                        <div className="row">
                          <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal", fontWeight: "900" }}>
                          <h6 className="card-subtitle m-2 mt-0 text-gray">{item.age}</h6></div>
                          <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}>
                            <h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? item.religion : item.religionArabic}</h6></div>
                          {item.arabic === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}>
                            <h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Arabic" : "عربي"}</h6></div>}
                          {item.english === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}>
                            <h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "English" : "انجليزي"}</h6></div>}
                          {item.week === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}>
                            <h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Daily" : " يومي"}</h6></div>}
                          {item.forever !== "0" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}>
                            <h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{item.forever + " IQR"}</h6></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
             <div className='col-lg-6 mt-10 lg:mt-0' style={{ display: verify ? "block" : "none" }}>
                <input placeholder={localStorage.getItem("language") === "English" ? 'Full Name' : "الاسم الكامل"}  onChange={e => setusername(e.target.value)} className='pl-4' style={{ width: "100%", height: "60px" }} />
                <input placeholder={localStorage.getItem("language") === "English" ? 'Phone Number' : "رقم الهاتف"}  onChange={e => setpassword(e.target.value)} className='pl-4 mt-4' style={{ width: "100%", height: "60px" }} />
                <input placeholder={localStorage.getItem("language") === "English" ? 'Location' : "العنوان"}  onChange={e => setlocation(e.target.value)} className='pl-4 mt-4' style={{ width: "100%", height: "60px" }} />
                
                {item.week === "1" ? 
                  <div className='flex m-4'>
                    <h3 className='text-white' style={{ fontFamily: "Tajawal", fontSize: "20px", fontWeight: "900" }}>{ localStorage.getItem('language') === 'Arabic' ? "السعر" : "Price"}</h3>
                    <div className='text-white ml-2' style={{ fontFamily: "Tajawal", fontSize: "17px", fontWeight: "400" }}>
                      {`${(50000 * Number(selectednum)).toLocaleString()} IQR`}
                    </div>
                    <p className='text-white ml-2'>{selectednum } { localStorage.getItem('language') === 'Arabic' ? "الايام" : "Days"}</p>
                  </div>
                  :  
                  <div className='flex m-4'> 
                    <h3 className='text-white' style={{ fontFamily: "Tajawal", fontSize: "20px", fontWeight: "900" }}> { localStorage.getItem('language') === 'Arabic' ? "السعر" : "Price"} </h3> 
                    <p className='text-white ml-2' style={{ fontFamily: "Tajawal", fontSize: "17px", fontWeight: "400" }}>{item.forever + " IQR"}</p> 

                    <div className="flex justify-start mt-20" style={{bottom: "0"}}>


                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 mr-4 focus:outline-none" >
                {localStorage.getItem('language') === 'Arabic'
                  ? `دفع الكتروني`
                  : `Online Payment`
                  }
                </button>

                <form ref={myform} onSubmit={sendMyEmail}>
                  <div className='hidden'>
                    <input  type="name" name="name" value={ `Name: ${username}`}/>
                    <input type="text" name="number" value={ `Phone Number: ${password}`}/>
                    <input type="text" name="location" value={ `Location: ${location}`}/>
                    <input type="price" name="price" value={(item.forever).toString() }/>

                  </div>

                <button type="submit" value="Send" style={{textDecoration: "none"}} className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-6 focus:outline-none"
                 onClick={() => {
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
                    calender: item.calender
                  };
                  myInfo.push(myObject);
                  const indexToRemove = myInfo.findIndex((info) => info.id === item.id);
                  if (indexToRemove !== -1) {
                    myInfo.splice(indexToRemove, 1);
                  }
                  setmyobject(myObject)
                  setobject([...myInfo]);
              }}>
                {localStorage.getItem('language') === 'Arabic' ? `دفع عند الاستلام` : `Payment on Delivery` }
                </button>
                </form>  
              </div>
            </div> }

                {item.week === "1" && (
                  <>
                    <p className='text-left text-white ml-4'>{ localStorage.getItem('language') === 'Arabic' ? " العاملة تعمل لمدة 7 ساعات في اليوم" : "*Each day is 7 hours"}</p>
                    <div className='flex justify-between items-center text-white pr-8 pl-8 mt-2'>
                      <h1 className='text-white text-2xl mb-6'>{ localStorage.getItem('language') === 'Arabic' ? arabicMonths[monthnum] : months[monthnum]}</h1>
                    </div>
                  </>
                )}

                {item.calender !== "0" && 
                <>
                  <div className=' justify-center  flex' >
                    {!myarray && setmyarray(item.calender)}
                    <Slider {...settings} ref={sliderRef} style={{  width: "80%", margin: "1px" }}>
                      {item.calender.map((month, index) => (
                        <div key={index} className="month-slide flex justify-start" > 
                          {month.map((day, i) => (
                          
                            <div
                              key={i}
                              style={{
                                display: verify ? "inline-block" : "none",
                                width: "40px",
                                margin: "1px",
                                cursor: "pointer",
                                fontWeight: "600",
                               
                              }}
                              id={`para-${i}-${index}`}
                              onClick={() => {
                                const id = `para-${i}-${index}`;
                                const element = document.getElementById(id);
                                if (item.calender[index][i] === 1) {
                                  if (myarray[index][i] === 1){
                                    myarray[index][i] = 0;

                                    usemycalender(prevState => {
                                      const updatedCalendar = [...prevState];
                                      updatedCalendar[index][i] = 0; 
                                      return updatedCalendar; 
                                    });
                                    
                                    element.classList.add("selected");
                                    useselectednum(selectednum + 1);
                                  } else {
                                    myarray[index][i] = 1;

                                    usemycalender(prevState => {
                                      const updatedCalendar = [...prevState];
                                      updatedCalendar[index][i] = 1; 
                                      return updatedCalendar; 
                                    });

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
                                  setmyobject(myObject)
                                  setobject([...myInfo]);
                                }
                              }}
                              className={`p-2 flex justify-center items-center border ${
                                day === currentDayNumber 
                                  ? "border-white text-white bg-blue"
                                  : myarray && item.calender[index][i] === 0 ? "text-black bg-white" : "text-white"  
                              }`}>
                              {i + 1}
                              {(document.getElementById(`para-${index}-${i}`)) === (document.getElementById(`para-${currentMonthNumber}-${currentDayNumber - 1}`)) && console.log(index) }
                            </div>
                          ))}
                        </div>
                      ))}
                    </Slider>

                  </div>
               
               <div className="arrow-buttons flex justify-center m-2">
               <PrevButton />
               <NextButton />  
               </div>
               </>
                }
            
                {item.week === "1" && 
                  <> 
                    {selectednum !== 0 ?
                      <button className='m-2 col-span-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' onClick={() => useverify(false)}>
                      {localStorage.getItem('language') === 'Arabic'
                      ? `تأكيد `
                      : ` Verify`
                      } 
                      </button>
                      :
                      <button className='m-2 col-span-4 py-2 px-4 bg-green-900 text-white rounded focus:outline-none'>
                      {localStorage.getItem('language') === 'Arabic'
                      ? `تأكيد `
                      : ` Verify`
                      } 
                      </button>
                    }
                  </>
                }
              </div>
              :
              <div className=" bg-gray-900 col-lg-6 text-white p-8 rounded-lg" style={{ display: verify ? "none" : "block" }}>
                <div className='text-white flex justify-end lg:-mt-14 mb-4'> 
                <button style={{
                  padding: "20px 10px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  fontFamily: "Tajawal",
              
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "50%"
                }} onClick={() => useverify(true)}>
                {localStorage.getItem('language') === 'Arabic' ? "رجوع" : "Go back"}
              </button> 
              </div>
              <p className="text-center text-lg mb-6">
                {localStorage.getItem('language') === 'Arabic'
                  ? `لقد تم حجز الموظفة ( ${myobject.nameArabic} ) لهذه الأيام`
                  : `The employee ( ${myobject.nameEnglish} ) has been booked for these days.`
                  }
              </p>

              <div className="grid lg:grid-cols-7 grid-cols-3  gap-4 mb-10">
                {Array.from({ length: 12 }, (_, i) =>
                  Array.from({ length: 31 }, (_, j) => {
                    const weekName = getWeekName(currentYearNumber, i, j);
                    return mycalender[i][j] === 0 && (
                      <div key={`${i}-${j}`} className="bg-white rounded-lg p-2 flex flex-col items-center">
                        <p className="text-md text-black" style={{fontFamily: "Tajawal", fontWeight: "600"}}>{i + 1} / {j + 1}</p>
                        <p className="text-sm text-black" style={{fontFamily: "Tajawal", fontWeight: "500"}}>{weekName}</p>
                      </div>
                    );
                  })
                )}
              </div>

              {localStorage.getItem('language') === 'Arabic' ?  
              <p className='mb-20'> السعر الاجمالي: {(50000 * Number(selectednum)).toLocaleString()} دينار عراقي </p> :  
              <p className='mb-20'> Total price: {(50000 * Number(selectednum)).toLocaleString()} Iraqi Dinnar</p>}

                <form ref={form} onSubmit={sendEmail}>
                  <div className='hidden'>
                    <input  type="name" name="name" value={ `Name: ${username}`}/>
                    <input type="text" name="number" value={ `Phone Number: ${password}`}/>
                    <input type="text" name="location" value={ `Location: ${location}`}/>
                   { 50000 * (Number(selectednum)).toLocaleString() === 0 ?
                   <input type="price" name="price" value={ `Price: ${item.forever} IQR`}/>
                   :
                   <input type="price" name="price" value={ `Price: ${(50000 * Number(selectednum)).toLocaleString()} IQR`}/>}
                    <input
                         type="text"
                         name="order"
                         className='text-black'
                         value={Array.from({ length: 12 }, (_, i) =>
                         Array.from({ length: 31 }, (_, j) => {
                           const weekName = getWeekName(currentYearNumber, i, j);
                           return mycalender[i][j] === 0 ? (
                             ` || ${i + 1} / ${j + 1} / ${weekName}  || \n`
                           ) : "";
                         }).filter(entry => entry.indexOf(",") === -1).join('')
                       )}
                    />
                       
                  </div>
                <button type="submit" value="Send" style={{textDecoration: "none"}} className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-6 focus:outline-none"
                  onClick={(e) => { sendDataToRepository(JSON.stringify(object));  }} >
                {localStorage.getItem('language') === 'Arabic'
                  ? `دفع عند الاستلام`
                  : `Payment on Delivery`
                  }
                </button>
                </form>

              <div className="flex justify-center mt-6" style={{bottom: "0"}}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 mr-4 focus:outline-none"  >
                {localStorage.getItem('language') === 'Arabic'
                  ? `دفع الكتروني`
                  : `Online Payment`
                  }
                </button>
    
              </div>
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
  );
};
