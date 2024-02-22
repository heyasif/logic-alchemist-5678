import { Button } from '@chakra-ui/react';

export default function Electronics({electronicsProducts}){

    
    return( <div style={{textAlign:"center", padding:"10px", border:"1px solid black",margin:"60px 0"}} >
        <h1 style={{fontWeight:"bold"}}> Electronics Section </h1>
        <div style={{width: "100%", display: "flex", padding: "10px", marginTop: "30px"}} >

            {
                electronicsProducts.map((product, index)=>{
                    return(
                        <div key={index} style={{ margin:"10px", padding:"10px", textAlign:"left", borderRadius:"10px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}} >
                            <img style={{borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}} src="https://www.sahivalue.com/product-images/14+pro+max.jpg/293890000021697778/400x400" alt="Product" />
                            <div style={{ padding:"0 15px 15px 15px"}} >
                                <h2 style={{fontSize:"20px", fontWeight:"bold", margin:"10px 0"}} >{product.name}</h2>
                                <p style={{fontWeight:"bold"}}>&#x20B9;{product.price}</p>
                                <p>{product.description}</p>
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


