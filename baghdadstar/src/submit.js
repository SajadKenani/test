export const SUBMIT = () => {
    return (
    <div style={{width: "100%", height: "900px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#023A48", color: "white"}}>

        <div>

        <h1 className="text-center text-3xl">
        {localStorage.getItem('language') === 'Arabic'
                  ? `تم ارسال الطلب بنجاح   `
                  : ` Your order has been sent`
                  }
          
        </h1>

        <p className="text-center">
        {localStorage.getItem('language') === 'Arabic'
                  ? `سنتواصل معك بأقرب وقت ممكن      `
                  : ` We will contact you as soon as possible`
        }
        </p>
        

        <div className="flex justify-center mt-10"><button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 mr-4 focus:outline-none"  onClick={() => window.location.assign("/")}>
                {localStorage.getItem('language') === 'Arabic'
                  ? `الرجوع للصفحة الرئيسية `
                  : ` Back to home page`
                  }
        </button>
        </div>
    </div>

    </div>
    )
}