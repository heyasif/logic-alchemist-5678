
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Error from '../Error';

export default function AllRoutes(){

    return(
        <div>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Error/>} />
              </Routes>
            </BrowserRouter>
        </div>
    )

}