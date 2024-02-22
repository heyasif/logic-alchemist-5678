import { Button } from "@chakra-ui/react";


const Books = ({booksProducts}) => {
    return (<div style={{textAlign:"center", padding:"10px", border:"1px solid black",margin:"60px 0"}} >
    <h1 style={{fontWeight:"bold"}}> Books Section </h1>
    <div style={{width: "100%", display: "flex", padding: "10px", marginTop: "30px"}} >

        {
            booksProducts.map((books, index)=>{
                return(
                    <div key={index} style={{ margin:"10px", textAlign:"left", borderRadius:"10px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}} >
                        <img style={{borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}} src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8fDA%3D" alt="Product" />
                        
                        <div style={{ padding:"0 15px 15px 15px"}} >
                            <h2 style={{fontSize:"20px", fontWeight:"bold", margin:"10px 0"}}>{books.name}</h2>
                            <p style={{fontWeight:"bold"}}>&#x20B9;{books.price}</p>
                            <p>{books.description}</p>
                            <div style={{display:"flex", justifyContent:"space-between", margin:"10px 0"}} >
                                <Button colorScheme='yellow'>Add to Cart</Button>
                                <Button colorScheme='orange'>View Details</Button>
                            </div>
                        </div>
                    </div>
                )
            })
        }

    </div>
    <Button colorScheme='teal' size='md' style={{margin:"10px"}} >
       View More
    </Button>
    </div>
    )
}

export default Books;