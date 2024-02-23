

const Footer = () => {

  

  return (
    <footer  style={{width:"100%", height:"auto", padding:"10px", border: "1px solid black"}} >
         <div style={{color:"black",width: "50%", margin:"0 auto", height:"70px", display:"flex", justifyContent:"space-around", alignItems:"center", paddingBottom:"10px"}} >
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-facebook"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-instagram"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-square-x-twitter"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-linkedin"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-youtube"></i>
            </div>

            <hr/>

            <div style={{display:"flex", justifyContent:"space-around", color:"black", padding: "20px 0"}} >
                <div style={{textAlign:"left"}} >
                    <h3 style={{fontWeight:"bold"}}>ABOUT</h3>
                    <p style={{fontWeight:"normal"}}>Contact Us</p>
                    <p style={{fontWeight:"normal"}}>About Us</p>
                    <p style={{fontWeight:"normal"}}>Careers</p>
                    <p style={{fontWeight:"normal"}}>EpicBazaar Story</p>
                    <p style={{fontWeight:"normal"}}>Corporate Information</p>
                </div>

                <div style={{textAlign:"left"}}>
                     <h3 style={{fontWeight:"bold"}}>CONSUMER POLICY</h3>
                     <p style={{fontWeight:"normal"}}>Cancellation & Returns</p>
                     <p style={{fontWeight:"normal"}}>Terms of Use</p>
                     <p style={{fontWeight:"normal"}}>Security</p>
                     <p style={{fontWeight:"normal"}}>Privacy</p>
                     <p style={{fontWeight:"normal"}}>EPR Compliance</p>
                </div>

                <div style={{textAlign:"left"}}>
                    <h3 style={{fontWeight:"bold"}}>SUPPORT</h3>
                    <p style={{fontWeight:"normal"}}>Payments</p>
                    <p style={{fontWeight:"normal"}}>Shipping</p>
                    <p style={{fontWeight:"normal"}}>Cancellation</p>
                    <p style={{fontWeight:"normal"}}>FAQ</p>
                    <p style={{fontWeight:"normal"}}>Report Infringement</p>
                </div>

                <div style={{textAlign:"left"}}> 
                    <h3 style={{fontWeight:"bold"}} >COMPANY ADDRESS</h3>
                    <p style={{fontWeight:"normal"}}>EpicBazaar Private Limited</p>
                    <p style={{fontWeight:"normal"}}>Buildings Alyssa, Begonia</p>
                    <p style={{fontWeight:"normal"}}>Clove Embassy Tech Village</p>
                    <p style={{fontWeight:"normal"}}>Bengaluru, 560103</p>
                    <p style={{fontWeight:"normal"}}>Karnataka, India</p>
                </div>
            </div>

            <hr/>

            <div style={{textAlign:"center", padding:"10px 0"}} > 
                <h3>© 2024 EpicBazaar. All rights reserved.</h3>
            </div>
       
    </footer>
  );
};

export default Footer;
