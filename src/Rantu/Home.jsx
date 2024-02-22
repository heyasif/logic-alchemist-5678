import Electronics from "./Electronics";
import { useEffect, useState } from "react";
import productsFetch from "./actions/ApiCall";
import Clothings from "./Clothings";
import Books from "./Books";
import Footer from "./Footer";




const Home = () => {
    // const dispatch = useDispatch();

    const [electronicsProducts, setElectronicsProducts] = useState([]);
    const [clothingsProducts, setClothingsProducts] = useState([]);
    const [booksProducts, setBooksProducts] = useState([]);

    useEffect(() => {
        productsFetch().then (res => {
            setElectronicsProducts(res.data.electronics);
            setClothingsProducts(res.data.clothing);
            setBooksProducts(res.data.books);
        });
    },[])

    console.log(electronicsProducts);
    console.log(clothingsProducts);
    console.log(booksProducts);

    return (
        <div>
            <h1>Welcome Home Consumer!</h1>
            {/* <HeroSection /> */}
             {/* <HomeAppliances /> */}
              <Electronics electronicsProducts={electronicsProducts} />
              <Clothings clothingsProducts={clothingsProducts} />
              <Books booksProducts={booksProducts} />
              <Footer/>
        </div>
    )




}
export default Home;