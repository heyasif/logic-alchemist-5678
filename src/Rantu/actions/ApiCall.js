import axios from "axios"


const productsFetch = async () => {
    try{
         let res = await axios.get(`http://localhost:3001/products`);
         console.log(res.data);
         return res;
    }
    catch(error){console.log(error)}
}

export default productsFetch;