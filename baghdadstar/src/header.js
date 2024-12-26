import { useEffect, useState } from "react";

import "./style.css";
import logo from "./images/logo.png";
import mobileNav from "./images/mobileNav.png";

import arabic from "./arabic.json"
import english from "./english.json"

import downArrow from "./images/downArrow.png"

import { createContext, useContext } from 'react';

import { useScrollContext } from './scrollContext';

import { ScrollProvider } from './scrollContext';

import { useRef } from "react";

import { Link } from "react-router-dom";

import myLogo from "./images/myLogo.png"





export const HEADER = () => {

    const { scrollToSection } = useScrollContext();

    const [lanvalue, uselanvalue] = useState({});

    const [landiv, uselandiv] = useState(false);

    const [showbar, useshowbar] = useState(false);

    const [scroll, usescroll] = useState(false)

   
    const handlehome = () => {
        scrollToSection(0);
   
     
      }

      const handleabout = () => {
        scrollToSection(1)
   
      }

      const handleservice = () => {
        scrollToSection(2)
   
      }

      const handlecontact = () => {
        scrollToSection(3)
  
      }

      

      const handlehomeMobile = () => {
        scrollToSection(0);
        handleMenu()
     
      }

      const handleaboutMobile = () => {
        scrollToSection(1)
        handleMenu()
      }

      const handleserviceMobile = () => {
        scrollToSection(2)
        handleMenu()
      }

      const handlecontactMobile = () => {
        scrollToSection(3)
        handleMenu()
      }

      const handleMenu = () => {
        useshowbar(!showbar);
      }

    useEffect(() => {if(localStorage.getItem("language") === "English") {uselanvalue(english)} else {uselanvalue(arabic)}  }, [])
    

    const handleLanguage = () => {

        if (localStorage.getItem("language") === "Arabic"){
            localStorage.setItem("language", "English");
     
        } else {
        localStorage.setItem("language", "Arabic")

    }    

    window.location.reload()
    window.location.assign("/") 
    }


    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 4) {
          usescroll(true);
         
        }else { usescroll(false); }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


    return (
        <div style={{width: "100%"}}>
        { showbar && <div className="fixed mybar" style={{width: "100%", height: "100%", zIndex: "74324277", backgroundColor: "white", paddingTop: "200px"}}>
            <p className="text-center mt-10 text-lg" style={{cursor: "pointer", color: "#023A48", fontFamily: "Tajawal"}} onClick={handlehomeMobile}>    {lanvalue.home} </p>
            <p className="text-center mt-10 text-lg" style={{cursor: "pointer", color: "#023A48", fontFamily: "Tajawal"}} onClick={handleaboutMobile}>   {lanvalue.about} </p>
            <p className="text-center mt-10 text-lg" style={{cursor: "pointer", color: "#023A48", fontFamily: "Tajawal"}} onClick={handleserviceMobile}> {lanvalue.services}  </p>
            <p className="text-center mt-10 text-lg" style={{cursor: "pointer", color: "#023A48", fontFamily: "Tajawal"}} onClick={handlecontactMobile}> {lanvalue.contact}  </p>
            <div className="flex justify-center mt-10"><Link to="/order" style={{fontFamily: "Tajawal"}} onClick={() =>  useshowbar(!showbar)}> {lanvalue.order} </Link></div>
           <p onClick={handleLanguage}  style={{color: "#023A48", cursor: "pointer", fontFamily: "Tajawal"}} className="text-center text-md font-medium mt-10 text-lg " >  {lanvalue.lan}</p>
        </div>
        }
        <div className="flex justify-center fixed" style={{width: "100%", height: "140px", zIndex: "244423443"}}>


        {scroll && <div className="myColor mt-10 hidden lg:flex appear " style={{ borderRadius: "5px",  boxShadow: "0px 0px 15px 1px gray"}}>
                <div className="flex justify-between">
                    <div className="m-7 flex">
                        <Link onClick={() => window.scrollTo(0, 0)} to="/order"><button className="order ml-20 pl-10 pr-10 pt-2 pb-2 rounded font-medium" style={{border: "2px solid #CDAB67",  fontFamily: "Tajawal", fontWeight: "900"}}> {lanvalue.order} </button></Link>
                        <Link className="mt-2" to="/"><a className="link ml-10 mr-6 text-lg font-medium " style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} onClick={handlehome}>  {lanvalue.home} </a></Link>
                        <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="link mr-6 text-lg font-medium mt-2" onClick={handleabout}>       {lanvalue.about} </a></Link>
                        <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="link mr-6 text-lg font-medium mt-2" onClick={handleservice}>     {lanvalue.services} </a></Link>
                        <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="link mr-6 text-lg font-medium mt-2" onClick={handlecontact}>     {lanvalue.contact} </a></Link>
                        <div>
                        <a style={{cursor: "pointer", fontFamily: "Tajawal"}} className="link mr-6 text-lg font-medium flex mt-2" 
                        onClick={() => uselandiv(!landiv)}> 
                        <p style={{fontFamily: "Tajawal", fontWeight: "900"}}>{lanvalue.language}</p> <img style={{marginTop: "12px", marginLeft: "5px" , width: "12px", height: "10px"}} src={downArrow} /> 
                        </a>

                        { landiv && 
                        <div className="flex justify-center"> 
                            <div style={{width: "120px", height: "40px", backgroundColor: "white", boxShadow: "0px 10px 15px 1px gray", borderRadius: "5px", marginTop: "10px", display: "flex", justifyContent: "center"}}> 
                              <p onClick={handleLanguage}  style={{color: "#023A48", cursor: "pointer"}} className="  text-md font-medium mt-2" > {lanvalue.lan} </p> 
                            </div>
                        </div> }

                        </div>

                    </div>

                    <div>
                        <img src={logo} style={{width: "300px",  marginTop: "-50px", position: "relative"}}/>

                    </div>  
                </div>
            </div>
          }

        {scroll === false && 
  
  <div className=" mt-10 hidden lg:flex disappear" style={{  borderRadius: "5px"}}>
  <div className="flex justify-between">
      <div className="m-7 flex">
          <Link to="/order"><button className="order ml-20 pl-10 pr-10 pt-2 pb-2 rounded font-medium" style={{border: "2px solid #CDAB67",  fontFamily: "Tajawal", fontWeight: "900"}}> {lanvalue.order} </button></Link>
          <Link className="mt-2" to="/"><a className="hlink ml-10 mr-6 text-lg font-medium " style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} onClick={handlehome}>  {lanvalue.home} </a></Link>
          <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="hlink mr-6 text-lg font-medium mt-2" onClick={handleabout}>       {lanvalue.about} </a></Link>
          <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="hlink mr-6 text-lg font-medium mt-2" onClick={handleservice}>     {lanvalue.services} </a></Link>
          <Link className="mt-2" to="/"><a style={{cursor: "pointer", fontFamily: "Tajawal", fontWeight: "900"}} className="hlink mr-6 text-lg font-medium mt-2" onClick={handlecontact}>     {lanvalue.contact} </a></Link>
          <div>
          <a style={{cursor: "pointer", fontFamily: "Tajawal"}} className="hlink mr-6 text-lg font-medium flex mt-2" 
          onClick={() => uselandiv(!landiv)}> 
          <p style={{fontFamily: "Tajawal", fontWeight: "900"}}>{lanvalue.language}</p> <img style={{marginTop: "12px", marginLeft: "5px" , width: "12px", height: "10px"}} src={downArrow} /> 
          </a>

          { landiv && 
          <div className="flex justify-center"> 
              <div style={{width: "120px", height: "40px", backgroundColor: "white", boxShadow: "0px 10px 15px 1px gray", borderRadius: "5px", marginTop: "10px", display: "flex", justifyContent: "center"}}> <p onClick={handleLanguage}  style={{color: "#023A48", cursor: "pointer"}} className="  text-md font-medium mt-2" > {lanvalue.lan} </p> </div>
          </div> }

          </div>

      </div>

      <div>
          <img src={myLogo} style={{width: "300px", padding: "70px", marginTop: "-90px", position: "relative"}}/>

      </div>  
  </div>
</div>
        
      
        }
            <div className="bg-white mt-10  lg:hidden" style={{ boxShadow: "0px 0px 7px 0.1px rgb(142, 142, 142)", borderRadius: "5px", width: '90%'}}>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                 
                   <div className="m-7 " style={{width: "40px", height: "20px"}}>
                      <img src={mobileNav} style={{marginTop: "10px",}} onClick={handleMenu}/> 
                      </div>
                  

                    <div style={{width: "200px", height: "100px"}}>
                        <img src={logo} style={{marginTop: "-30px", }}/>

                    </div>
                    
                </div>
            </div>
         
        </div> 
   
    </div>
    )
}