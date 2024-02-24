import "./footer.css" 
const Footer = () => {
    return (
        <div style={{width:"100%", height:"auto", padding:"10px", border: "1px solid black", backgroundColor: "#e0f2fe", marginTop: "70px"}} >
            <div style={{color:"black", width: "50%", margin:"0 auto", height:"70px", display:"flex", justifyContent:"space-around", alignItems:"center", paddingBottom:"10px"}}>
                <i className="fa-brands fa-facebook icon"></i>
                <i className="fa-brands fa-instagram icon"></i>
                <i className="fa-brands fa-square-x-twitter icon"></i>
                <i className="fa-brands fa-linkedin icon"></i>
                <i className="fa-brands fa-youtube icon"></i>
            </div>

            <hr/>

            <div style={{display:"flex", justifyContent:"space-around", color:"black", padding: "20px 0"}} >
                <div className="footerDetails" >
                    <h3 style={{fontWeight:"bold", marginBottom:"10px"}}>ABOUT</h3>
                    <p>Contact Us</p>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>EpicBazaar Story</p>
                    <p>Corporate Information</p>
                </div>

                <div className="footerDetails">
                     <h3 style={{fontWeight:"bold", marginBottom:"10px"}}>CONSUMER POLICY</h3>
                     <p>Cancellation & Returns</p>
                     <p>Terms of Use</p>
                     <p>Security</p>
                     <p>Privacy</p>
                     <p>EPR Compliance</p>
                </div>

                <div className="footerDetails">
                    <h3 style={{fontWeight:"bold", marginBottom:"10px"}}>SUPPORT</h3>
                    <p>Payments</p>
                    <p>Shipping</p>
                    <p>Cancellation</p>
                    <p>FAQ</p>
                    <p>Report Infringement</p>
                </div>

                <div className="footerDetails"> 
                    <h3 style={{fontWeight:"bold", marginBottom:"10px"}} >COMPANY ADDRESS</h3>
                    <p>EpicBazaar Private Limited</p>
                    <p>Buildings Alyssa, Begonia</p>
                    <p>Clove Embassy Tech Village</p>
                    <p>Bengaluru, 560103</p>
                    <p>Karnataka, India</p>
                </div>
            </div>

            <hr/>

            <div style={{textAlign:"center", padding:"10px 0"}} > 
                <h3>© 2024 EpicBazaar. All rights reserved.</h3>
            </div>

        </div>
    )
}

export default Footer;