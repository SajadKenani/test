import { useState, useEffect } from "react";




import arabic from "./arabic.json"
import english from "./english.json"

export const FOOTER = () => {


    const [lanvalue, uselanvalue] = useState({});
  
    const [lanstat, uselanstat] = useState(true);


    useEffect(() => {if(localStorage.getItem("language") === "English") {uselanvalue(english); uselanstat(false)} else {uselanvalue(arabic); uselanstat(true)}  }, [])
  

    return (
        <div className="" style={{ bottom: "0", width: "100%", bottom: "0"}}>
        <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: "#ECEFF1", bottom: "0" }}>
          <section className={`d-flex ${lanstat ? "justify-content-end" : "justify-content-start"} p-4 text-white`} style={{ backgroundColor: "#023A48" }}>
            <div className="mr-5">
              <span style={{fontFamily: "Tajawal"}} className="text-lg">{lanvalue.mainFooter}</span>
            </div>
  
          </section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-left text-2xl">{lanvalue.name}</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto " style={{ width: "60px", height: "2px" }} />
                  <p className="text-left" style={{fontSize: "18px"}}>
                  {lanvalue.leftPara}
                  </p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold text-left text-lg">{lanvalue.usefullLinks}</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px",  height: "2px" }} />
                  <p className="text-left"><a href="#home" className="text-lg text-dark text-left">{lanvalue.home}</a></p>
                  <p className="text-left"><a href="#about" className="text-lg text-dark text-left">{lanvalue.about}</a></p>
                  <p className="text-left"><a href="#service" className="text-lg text-dark text-left">{lanvalue.services}</a></p>
                  <p className="text-left"><a href="#contact" className="text-lg text-dark text-left">{lanvalue.contact}</a></p>

                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold text-left text-lg">{lanvalue.lcontact}</h6>
                  <hr className="mb-4 mt-0 d-inline-block text-lg  mx-auto" style={{ width: "60px",  height: "2px" }} />
                  <p className="text-left"><i className=" text-lg fas fa-home mr-3 "></i> {lanvalue.location}</p>
                  <p className="text-left"><i className=" text-lg fas fa-envelope mr-3"></i> info@baghdadstar.online</p>
                  <p className="text-left"><i className=" text-lg fas fa-phone mr-3"></i> +9647753009009</p>
                  <p className="text-left"><i className=" text-lg fas fa-print mr-3"></i> +9647853009009</p>
                </div>

                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4 " >
                  <div style={{width: "100%", height: "150px", backgroundColor: "gray", display: "flex", alignItems: "center", justifyContent: "center"}} className="text-white rounded">
                    QR CODE
                  </div>

                </div>


              </div>
            </div>
          </section>
          <div className="text-center p-3 mt-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", bottom: "0" }}>
            © 2024 Copyright:
            <a className="text-dark" href="https://yamanalkhair.com">{lanvalue.copyRight}</a>
          </div>
        </footer>
      </div>
    )
}