import React, { useState, useEffect, useRef } from 'react';
import { Octokit } from '@octokit/rest';
import home from "./images/home.png"
import "./App.css"

import icon from "./images/icon.png"
import icon2 from "./images/icon2.png"
import icon3 from "./images/icon3.png"
import icon4 from "./images/icon4.png"
import icon5 from "./images/icon5.png"

import column from "./images/column.png"

import arabic from "./arabic.json"
import english from "./english.json"

import aboutUsImage from "./images/aboutUsImage.png";

import aboutUsMain from "./images/aboutUsMainImage.png";

import serviceRight from "./images/serviceRight.png";
import serviceRightMobile from "./images/serviceRightMobile.png";
import serviceLeft from "./images/serviceLeft.jpg";

import triWhatsapp from "./images/triWhatsapp.png"
import triFacebook from "./images/triFacebook.png"
import triTwitter from "./images/triTwitter.png" 
import triInsta from "./images/triInsta.png"
import triTiktok from "./images/triTiktok.png"

import contactUsBackground from "./images/contactUsBackground.jpg";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ScrollProvider, useScrollContext } from './scrollContext';

import tringles from "./images/tringles.png"
import whatsapp from "./images/ww.png"

import axios from 'axios';


import "./style.css";

export const CONTENT = () => {

  const [value, setvalue] = useState([{}]);
  const [lanvalue, uselanvalue] = useState({});
  const [lanstat, uselanstat] = useState(true)

  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollToSection } = useScrollContext();

  const settings = {
    
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleabout = () => {
    scrollToSection(1)

  }


  useEffect(() => {
    const handleScroll = () => {
      const targetRect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Check if the target element is fully visible within the viewport
      if (targetRect.top >= 0 && targetRect.bottom <= windowHeight) {
        setIsVisible(prev => {
          // Use a functional update to ensure latest state is used
          if (!prev) {
            // Log only when it's transitioning to true
            setIsVisible(true);
            console.log(isVisible);
          }
          return true;
        });
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Call handleScroll initially
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
   
    const timer = setInterval(() => {
      if (isVisible) setCount(prevCount => (prevCount < 20 ? prevCount + 1 : prevCount));
    }, 60); // Increment every second

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isVisible) setCount1(prevCount => (prevCount < 40 ? prevCount + 1 : prevCount))
    }, 40); // Increment every second

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isVisible) setCount2(prevCount => (prevCount < 60 ? prevCount + 1 : prevCount));
    }, 20); // Increment every second

    return () => clearInterval(timer);
  }, [isVisible]);


    useEffect(() => {
    const fetchFileContentFromRepository = async () => {
    try {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN // Use environment variable
      });
  
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js' // Specify the path to your file
      });
      // Decode base64 content to get the actual file content
      const content = response.data.content;
  
      // Decode base64 content to get the actual file content
      const decodedContent = JSON.parse(decodeURIComponent(escape(atob(content))));
      setvalue(decodedContent)
      console.log(value)
      

    } catch (error) {
      console.error('Error fetching file content from repository:', error);
    }
  }

  fetchFileContentFromRepository();
}, []);

useEffect(() => {if(localStorage.getItem("language") === "English") {uselanvalue(english); uselanstat(true)} else {uselanvalue(arabic);  uselanstat(false)}  }, [])


// const sendMessage = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/send-message', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
      
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send message');
//     }

//     const data = await response.json();
//     console.log('Message sent:', data);
//     // Handle success, update UI, etc.
//   } catch (error) {
//     console.error('Error sending message:', error.message);
//     // Handle error, display error message, etc.
//   }
// };




// useEffect(() => {
//   sendMessage()
// }, [])



    return (
      <ScrollProvider>
    <div>
    <a id='whatsapp' href="https://wa.me/+9647753009009"> <img src={whatsapp} />  </a>
        <div className="flex justify-center" id='home'>
  
            {/* Home section */}

            <div className="lg:flex justify-center  " style={{position: "relative", zIndex: "34324", height: "1000px",  width: "100%", paddingTop: "400px", backgroundColor: "#023A48", top: "0"}}>
            <img className='hidden lg:flex' style={{position: "absolute", zIndex: "1", height: "1000px", objectFit: "cover", width: "100%", marginTop: "-340px"}} src={home}  />
            <img
              className='flex lg:hidden'
              style={{
                position: "absolute",
                zIndex: "1",
                height: "auto", // Adjusted height to maintain aspect ratio
                objectFit: "cover",
                width: "100%",
                marginTop: "-100px"
              }}
              src={home}
              srcSet={`${home} 800w, ${home} 1200w`} // Replace homeLargeUrl with the actual URL of the higher-resolution image
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
              alt="Home Image"
            />
            <div >
            <h1 className="lg:text-left text-5xl font-bold text-white lg:mt-0 -mt-36 lg:pr-32 text-center" 
            style={{ textShadow: "2px 2px 4px rgba(67, 67, 67, 0.5)", position: "relative", zIndex: "5434", ...(!lanstat && { fontFamily: "Tajawal" }) }}> {lanvalue.companyName} </h1>
                <p className={` ${!lanstat ? "lg:text-left" : "lg:text-left" }  text-2xl text-center font-light text-white mt-2`} 
                style={{textShadow: "0px 2px 13px rgba(67, 67, 67, 0.5)" , position: "relative", zIndex: "32321", ...(!lanstat && { fontFamily: "Tajawal" })}}> {lanvalue.companyPara} </p>
                <div style={{display: "flex", marginTop: "70px", position: "relative", zIndex: "32321",}} className={`justify-center ${!lanstat ? "lg:justify-start" : "lg:justify-start" } `}>
                  <button className="pl-12 pr-12 pt-3 pb-3 rounded font-semibold lg:text-left subOrder" 
                  style={{border: "2px solid #ffffff", fontWeight: "700", ...(!lanstat && { fontFamily: "Tajawal" })}} onClick={handleabout}> {lanvalue.about} </button></div>
            </div>

            <div className='hidden lg:flex justify-center lg:mt-0 mt-60' >

            <iframe style={{zIndex: "54754395434", marginTop: "-100px"}} src="https://baghdadstar.online/slider.html" width="700" height="400" frameborder="0"></iframe>

            </div>

            <div className='flex lg:hidden justify-center lg:mt-0 mt-60' >

            <iframe style={{zIndex: "54754395434", marginTop: "-200px"}} src="https://baghdadstar.online/mobileslider.html" width="700" height="400" frameborder="0"></iframe>
            
            </div>

            </div>
            {/* End Home section */}
      
            {/* {Bar section} */}
        </div >

        

        <div ref={targetRef}>
        {targetRef !== null && 

         <div  className=' lg:flex justify-center hidden pt-20 lg:pt-0' style={{display: "flex", justifyContent: "center", marginTop: "-400px", position: "relative", zIndex: "343243", paddingTop: "200px"}}>
          <div className='flex justify-left ml-36' style={{width :"100%", marginLeft: "130px", position: "absolute"}}>
          <img className='ml-36 hidden lg:flex ' src={column} style={{width: "130px", height: "360px", position: "absolute", zIndex: "343243", marginTop: "90px", marginLeft: "100px",  marginRight: "-70px", left: "0"}}/> 
         </div>

         <div className='flex justify-left' style={{position: "relative", width: "100%", marginLeft: "250px"}}>
            <div className='hidden lg:flex justify-between pl-40 pr-60' style={{width: "80%", height: "185px", marginTop: "180px", zIndex: "32488", position: "relative",  backgroundColor: "#023A48", boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.321)"}}> 
            
              {targetRef && <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                <img src={icon} />
                <div className='mt-4'>
                  <h3 className='text-left  text-4xl' style={{color: "#CDAB67", fontFamily: "Tajawal"}}>  {count} </h3>
                  <div className='text-left w-60' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.satisfied} </div>
                </div>
              </div>}

              {targetRef &&  <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                <img src={icon}/>
                <div className='mt-4'>
                  <h3 className='text-left text-4xl' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {count1} </h3>
                  <div className='text-left w-60' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.experince} </div>
                </div>
              </div>}

              {targetRef &&  <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                <img src={icon} />
                <div className='mt-4'>
                  <h3 className='text-left text-4xl' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {count2} </h3>
                  <div className='text-left w-60 ' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.project}  </div>
                </div>
              </div> }
              
            </div>
            </div>
          </div>}

          </div>
            <div  className='flex justify-center lg:hidden ' style={{width: "100%", height: "505px", marginTop: "180px", zIndex: "32488", position: "relative",  backgroundColor: "#023A48"}}> 
       
            <div style={{marginLeft: "-100px"}}>
            <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                  <img src={icon} />

                  <div className='mt-4'>
                  <h3 className='text-left  text-4xl' style={{color: "#CDAB67"}}> {count} </h3>
                  <div className='text-left w-60 ' style={{color: "#CDAB67", fontFamily: "Tajawal"}}>  {lanvalue.satisfied}   </div>

                </div>

              </div>

              <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                  <img src={icon} />

                  <div className='mt-4'>
                  <h3 className='text-left text-4xl' style={{color: "#CDAB67"}}> {count1} </h3>
                  <div className='text-left w-60' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.experince}  </div>

                  </div>

              </div>

              <div className='flex mt-11' style={{width: "100px", height: "100px"}}>
                  <img src={icon} />
                <div className='mt-4'>
                  <h3 className='text-left text-4xl' style={{color: "#CDAB67"}}> {count2} </h3>
                  <div className='text-left w-60 ' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.project}  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {End bar section} */}

          {/* About us section */}

          <div id='about'>
            <img src={aboutUsImage} style={{width: "100%", height: "1300px", marginTop: "-350px", objectFit: "cover", position: "absolute", zIndex: "0"}} />

            <div className='lg:flex justify-between relative lg:p-40 p-10 pt-14' >
              <div style={{width: "100%"}} className='mt-4 mb-10'>
                <h1 className='text-center text-5xl font-bold mb-14' style={{color: "#023A48", fontFamily: "Tajawal"}}> {lanvalue.aboutUsSection}  </h1>
                <p className={` ${lanstat ? "text-start" : "text-right" }  lg:pr-16 text-lg font-semibold lg:m-0 m-2 mt-14 `} style={{color: "#023A48", fontFamily: "Tajawal", fontSize: "20px"}}>
                {lanvalue.aboutUsPara}
                </p>

                <p className={` ${lanstat ? "text-start" : "text-right" }   lg:pr-16 text-lg font-semibold lg:m-0 m-2 mt-6`} style={{color: "#023A48", fontFamily: "Tajawal", fontSize: "20px"}}>
                {lanvalue.aboutUsSecPara}
                </p>
              </div>

              <div style={{width: "100%"}}> <img src={aboutUsMain} /> </div>
            </div>
          </div>

          {/* End about us section */}
          {/* serviceRight */}

          {/*  services section */}
          <div id='service' className='' style={{width: "100%", height: "20px", backgroundColor: "#023A48", zIndex: "443243", position: "relative", marginBottom: "24px"}}></div>
          <div className='hidden lg:flex justify-between ' >
            
            <div style={{width: "90%"}} className='color bg-black'>
              <img src={serviceLeft} className='absolute ' style={{marginTop: "-40px", height: "900px", objectFit: "cover"}} />
              <img src={serviceRight} className=' absolute ' style={{height: "900px", marginTop :"-40px", right: "0", objectFit: "cover"}}/>
              <div className='text-black relative flex justify-between' style={{zIndex: "2432423", width: "100%"}}>
                <div></div>
                <div>
                  <div className='flex justify-center'><h1 className='text-start text-5xl font-bold mt-20 ' style={{color: "#023A48", fontFamily: "Tajawal"}}> {lanvalue.servicesSection} </h1></div>
                  <div className='flex justify-center'>
                    <p className="text-center mt-10  font-semibold" style={{color: "#023A48", width: "500px", fontFamily: "Tajawal", fontSize: "20px"}}>
                    {lanvalue.servicesPara}
                    </p>
                  </div>
                  <div className='flex justify-center mt-20'>
                  <div className=' '>

                    <div className='flex'>
                      <img src={icon2} className='w-20 mr-10 p-2'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.service1}</p>
                    </div>

                    <div className='flex mt-2'>
                      <img src={icon3} className='w-20 mr-10'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.service2}</p>
                    </div>

                    <div className='flex mt-2'>
                      <img src={icon4} className='w-20 mr-10 p-3'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}> {lanvalue.service3}</p>
                    </div>

                  </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className='flex lg:hidden justify-between'>
            
            <div style={{width: "100%"}}>
              <img src={serviceRightMobile} className=' absolute ' style={{height: "900px", marginTop :"-40px", width: "100%", objectFit: "cover", marginBottom: "-50px"}}/>
              <div className='text-black relative flex justify-center' style={{zIndex: "2432423", width: "100%"}}>
                <div>
                  <div className='flex justify-center'><h1 className='text-start text-4xl font-bold mt-20' style={{color: "#023A48", fontFamily: "Tajawal"}}>  {lanvalue.servicesSection} </h1></div>
                  <div className='flex justify-center'>
                    <p className="text-center mt-10 font-semibold" style={{color: "#023A48", width: "90%", fontFamily: "Tajawal", fontSize: "20px"}}>
                    {lanvalue.servicesPara}
                    </p>
                  </div>
                  <div className='flex justify-center mt-20'>
                  <div className=' '>

                    <div className='flex'>
                      <img src={icon2} className='w-20 mr-10 p-2'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}>{lanvalue.service1} </p>
                    </div>

                    <div className='flex mt-2'>
                      <img src={icon3} className='w-20 mr-10'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}>{lanvalue.service2} </p>
                    </div>

                    <div className='flex mt-2'>
                      <img src={icon4} className='w-20 mr-10 p-3'/>
                      <p className='mt-6 text-2xl font-semibold' style={{color: "#CDAB67", fontFamily: "Tajawal"}}>{lanvalue.service3} </p>
                    </div>

                  </div>
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className='hidden lg:flex'
              style={{ 
              width: "100%", 
              height: "20px", 
              backgroundColor: "#023A48", 
              zIndex: "443243", 
              position: "relative", 
              marginTop: lanstat ? "230px" : "260px"
            }}></div>
          <div className='flex lg:hidden' style={{width: "100%", height: "20px", backgroundColor: "#023A48", zIndex: "443243", position: "relative", marginTop: "50%"}}></div>
          {/* End services section */}

        {/* Contact us section */}

        <div id='contact' className='color'>
        <img  src={tringles} style={{ width: "100%", height: "1000px", objectFit: "cover", position: "absolute", ...(!lanstat ? { marginTop: "-254px" } : {marginTop: "-285px"})}}/>
          {/* <img src={contactUsBackground} className='backImage' style={{position: "absolute", objectFit: "cover", width: "100%", zIndex: "2"}}/> */}
          <div className='lg:flex justify-between lg:pr-60 lg:pl-60 lg:pb-20' style={{zIndex: "2132321321321", position: "relative", zIndex: "2"}}>
            
            <div>
            <div className='flex justify-center'><h1 className='text-center text-5xl font-bold mt-40' style={{color: "#023A48", fontFamily: "Tajawal"}}> {lanvalue.contactUsSection}  </h1></div>
            <div className='flex justify-center'><p className='text-center  font-semibold mt-10 p-4 lg:p-0' style={{color: "#023A48", width: "500px", fontFamily: "Tajawal", fontSize: "20px"}}> {lanvalue.contactUsPara} </p></div>
            <div className='flex justify-center mt-40'>
              <img onClick={() => window.location.assign("tiktok")} style={{width: "120px", cursor: "pointer"}} src={triTiktok} />
              <img onClick={() => window.location.assign("facebook")} style={{width: "120px", cursor: "pointer", marginTop: "-30px", marginBottom: "30px"}} src={triFacebook} />
              <img onClick={() => window.location.assign("instagram")} style={{width: "120px", cursor: "pointer"}} src={triInsta} />
             
       
            </div>
            </div>

            <div>
                <div class="mt-20 map flex justify-center lg:justify-end lg:pr-24">
                    <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=+Masbah+Baghdad+Iraq" 
                    frameborder="0" style={{ border: '0', width: '600px', height: '500px' }} allowfullscreen></iframe>
                </div>
            </div>

          </div>

        </div>

        {/* End contact us section */}

        </div>
        </ScrollProvider>
    )
}