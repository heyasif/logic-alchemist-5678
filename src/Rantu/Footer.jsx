

const Footer = () => {
    return (
        <div style={{width:"100%", height:"300px", padding:"20px", border: "1px solid black"}} >
            <div style={{color:"black",width: "50%", margin:"0 auto", height:"70px", display:"flex", justifyContent:"space-around", alignItems:"center"}} >
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-facebook"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-instagram"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-square-x-twitter"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-linkedin"></i>
            <i style={{fontSize:"25px", borderRadius:"50%", border: "2px solid black", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center"}} class="fa-brands fa-youtube"></i>
            </div>
            <div style={{display:"flex", justifyContent:"space-around", color:"black"}} >
                <div>About</div>
                <div>Policies</div>
                <div>Help</div>
                <div>Contact Details</div>
            </div>
            <div>Message - CopyRight</div>

        </div>
    )
}

export default Footer;