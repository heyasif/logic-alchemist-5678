import '../App.css'

const SinglePage =()=>{
    return(
       <div className="productPage">
    <div className="product-left">
        <h2>Category</h2>
        <input type="checkbox" />
        <label value="Mens"> Mens</label>
        <input type="checkbox" />
        <label value="Mens"> Womens</label>
        <input type="checkbox" />
        <label value="Mens"> Kids</label>
        <hr/>
        <h2>Brand</h2>
        <input type="checkbox" />
        <label value="handm"> H&M</label>
        <input type="checkbox" />
        <label value="roadster"> Roadster</label>
        <input type="checkbox" />
        <label value="levis"> Levis</label>
        <input type="checkbox" />
        <label value="wrogn"> Wrogn</label>
        <input type="checkbox" />
        <label value="highlander"> Highlander</label>
        <input type="checkbox" />
        <label value="jokey"> Jokey</label>
     
    </div>
    <div className="product-right">
        
    </div>
       </div>
    );
}

export default SinglePage;