
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home';

export default function AllRoutes(){

    return(
        <div>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path />
              </Routes>
            </BrowserRouter>
        </div>
    )

}