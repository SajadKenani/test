import { Octokit } from '@octokit/core';
import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ORDER = () => {

  const [myvalue, setmyvalue] = useState(null);
  const [loaded, useloaded] = useState(false);
  const [errorloading, useerrorloading] = useState(false);

  const [dailyselected, usedailyselected] = useState(false);
  const [purchaseselected, usepurchaseselected] = useState(true);
  const [allselected, useallselected] = useState(false);

  const Badge = ({ icon, label }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        color: "#0984e3",
        borderRadius: "12px",
        padding: "6px 12px",
        margin: "5px",
        fontWeight: "bold",
        fontFamily: "Tajawal, sans-serif",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(9, 132, 227, 0.2)",
      }}
    >
      <i className={icon} style={{ marginRight: "6px", fontSize: "16px" }}></i> {label}
    </div>
  );
  

  const fetchFileContentFromRepository = async () => {
    try {
      const octokit = new Octokit({
        auth:  process.env.REACT_APP_GITHUB_AUTH_TOKEN
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

  return (
<div className="App" style={{width: "100%", padding: "50px", backgroundColor: "#023A48", paddingTop: "200px", paddingBottom: "200px"}}>

  {/* <div className='flex justify-center mb-20 '>

  <div className='lg:flex justify-center lg:pb-0 pb-20' style={{width: "70%", height: "fit-content", marginLeft: "15px", border: "2px solid white", borderRadius: "5px", borderColor: "white"}}>
    <h3 className='text-white m-10' style={{fontWeight: "900", fontFamily: "Tajawal"}}>     
    {localStorage.getItem('language') === 'Arabic'
                  ? `اختر نوع العاملة `
                  : ` Choose the type of the worker: `
                  }</h3>

     <div onClick={() => {useallselected(true); usedailyselected(false); usepurchaseselected(false)}}  className='flex' style={{cursor: "pointer", width: "170px", height: "50px", marginLeft: "15px", border: "2px solid white", borderRadius: "5px", borderColor: "white", marginTop: "20px", display: "flex", justifyContent: "center", backgroundColor: allselected ? "white" : ""}}>
    <p className='text-center' style={{ textAlign: "center", marginTop: "10px", color: allselected ? "black" : "white" }}>All</p>
    </div> 


    <div className='flex justify-center'>
    <div onClick={() => {useallselected(false); usedailyselected(true); usepurchaseselected(false)}} 
    className='flex justify-center' style={{cursor: "pointer", width: "170px", height: "50px", marginLeft: "15px", border: "2px solid white", borderRadius: "5px", borderColor: "white", marginTop: "20px", display: "flex", justifyContent: "center", backgroundColor: dailyselected ? "white" : ""}}>
    <p className='text-center' style={{ textAlign: "center", marginTop: "10px", color: dailyselected ? "black" : "white", fontFamily: "Tajawal" }}>
    {localStorage.getItem('language') === 'Arabic'
                  ? `يومي `
                  : ` Daily`
                  }
    </p>
    </div>
    </div>

    <div className='flex justify-center'>
    <div onClick={() => {useallselected(false); usedailyselected(false); usepurchaseselected(true)}}
    className='flex' style={{cursor: "pointer", width: "170px", height: "50px", marginLeft: "15px", border: "2px solid white", borderRadius: "5px", borderColor: "white", marginTop: "20px", display: "flex", justifyContent: "center", backgroundColor: purchaseselected ? "white" : ""}}>
    <p className='text-center' style={{ textAlign: "center", marginTop: "10px", color: purchaseselected ? "black" : "white", fontFamily: "Tajawal" }}>
    {localStorage.getItem('language') === 'Arabic'
                  ? `شراء `
                  : ` Purchase`
                  }
    </p>
    </div>
    </div>


  </div>
  </div> */}

  {loaded ?
  
  <div className="row p-3" >
{myInfo && purchaseselected &&
  myInfo
    .filter(item => item.week === "0")
    .filter(item => item.isRented === "0")
    .map((item, index) => (
      <Link
        key={"item-" + index}
        className="col-lg-3 mt-4"
        to="worker"
        onClick={() => {
          localStorage.setItem("eventId", item.id.toString());
          window.scrollTo(0, 0);
        }}
        style={{ textDecoration: "none" }}
      >
        <div
          className="card"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            background: "linear-gradient(145deg, #f0f0f0, #d9d9d9)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
          }}
        >
          <img
            src={item.image}
            alt="Item"
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "20px 20px 0 0",
              filter: "brightness(0.8)",
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1)"}
            onMouseLeave={(e) => e.currentTarget.style.filter = "brightness(0.8)"}
          />
          <div
            style={{
              padding: "20px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "0 0 20px 20px",
              position: "relative",
            }}
          >
            <h3
              style={{
                fontFamily: "Tajawal, sans-serif",
                color: "#2d3436",
                fontWeight: "bold",
                fontSize: "22px",
                marginBottom: "10px",
              }}
            >
              {localStorage.getItem("language") === "English"
                ? item.nameEnglish
                : item.nameArabic}
            </h3>
            <div className="d-flex flex-wrap mb-3">
              <Badge icon="fa-solid fa-user" label={item.age} />
              <Badge
                icon="fa-solid fa-cross"
                label={
                  localStorage.getItem("language") === "English"
                    ? item.religion
                    : item.religionArabic
                }
              />
              {item.arabic === "1" && <Badge icon="fa-solid fa-language" label="Arabic" />}
              {item.english === "1" && <Badge icon="fa-solid fa-language" label="English" />}
              {item.week === "1" && <Badge icon="fa-solid fa-calendar-day" label="Daily" />}
              {item.forever !== "0" && <Badge icon="fa-solid fa-money-bill" label={`${item.forever} IQD`} />}
            </div>
            <button
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#0984e3",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                padding: "10px 0",
                fontSize: "16px",
                color: "#fff",
                boxShadow: "0 8px 15px rgba(9, 132, 227, 0.4)",
                transition: "background 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#74b9ff";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0984e3";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </Link>
    ))}


{/* 
{myInfo && dailyselected &&
    myInfo
      .filter(item => item.week === "1")
      .map((item, index) => (
        <Link   key={"item-" + index} className="col-lg-3 mt-3 myLink" style={{ borderRadius: "10px", textDecoration: "none",  }}  to="worker" onClick={() => { localStorage.setItem("eventId", (item.id).toString()); window.scrollTo(0, 0)}} >
          <div className="cardkl bg-white" style={{ cursor: "pointer", boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.333)", backgroundColor: "white", borderRadius: "10px" }}>
            <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px", width: "100%", height: "250px", objectFit: "cover" }} />
            <div className="card-body" style={{ backgroundColor: "white" }}>
              <h4 className="card-title" style={{ color: "black", fontWeight: "900", fontSize: "20px", fontFamily: "Tajawal" }}>{localStorage.getItem("language") === "English" ? item.nameEnglish : item.nameArabic}</h4>
              <div className="row">
                <div className="col">
                  <div className="card-text">
                    <div className="row">
                      <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal", fontWeight: "900" }}>
                        <h6 className="card-subtitle m-2 mt-0 text-gray">{item.age}</h6></div>
                      <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? item.religion : item.religionArabic}</h6></div>
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
        </Link>
      ))} */}
{/* 
{myInfo && allselected &&
    myInfo
      .map((item, index) => (
        <div key={"item-" + index} className="col-lg-3 mt-3" style={{ borderRadius: "10px" }}>
          <div className="cardkl bg-white" style={{ cursor: "pointer", boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.333)", backgroundColor: "white", borderRadius: "10px" }}>
            <img src={item.image} className="card-img-top" alt="Item Image" style={{ borderRadius: "0px", width: "100%", height: "250px", objectFit: "cover" }} />
            <div className="card-body" style={{ backgroundColor: "white" }}>
              <h4 className="card-title" style={{ color: "black", fontWeight: "900", fontSize: "20px", fontFamily: "Tajawal" }}>{localStorage.getItem("language") === "English" ? item.nameEnglish : item.nameArabic}</h4>
              <div className="row">
                <div className="col">
                  <div className="card-text">
                    <div className="row">
                      <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal", fontWeight: "900" }}><h6 className="card-subtitle m-2 mt-0 text-gray">{item.age}</h6></div>
                      <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? item.religion : item.religionArabic}</h6></div>
                      {item.arabic === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Arabic" : "عربي"}</h6></div>}
                      {item.english === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "English" : "انجليزي"}</h6></div>}
                      {item.week === "1" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{localStorage.getItem("language") === "English" ? "Daily" : " يومي"}</h6></div>}
                      {item.forever !== "0" && <div className='m-1' style={{ border: "1px solid black", borderRadius: "5px", paddingLeft: "10px", paddingRight: "10px", borderColor: "gray", fontFamily: "Tajawal" }}><h6 className="card-subtitle m-2 mt-0 text-gray" style={{ fontWeight: "900" }}>{item.forever + " IQR"}</h6></div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}


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

