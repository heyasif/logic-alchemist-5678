
import { Routes, Route } from 'react-router-dom';
import Home from '../Rantu/Home';
import Error from '../Rantu/Error';
import Account from '../Asif/Account';
import Cart from '../Raushan/Cart';
import SinglePage from '../sujeet/singlePage';

export default function AllRoutes(){

    return(
        <div>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/account' element={<Account/>} />
                <Route path='/products' element={<SinglePage/>} />
                <Route path='/login' element={<Cart/>}/>
                <Route path='*' element={<Error/>} />
              </Routes>
        </div>
    )
}