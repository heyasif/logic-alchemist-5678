
import { Routes, Route } from 'react-router-dom';
import Home from '../Rantu/Home';
import Error from '../Rantu/Error';

export default function AllRoutes(){

    return(
        <div>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Error/>} />
              </Routes>
        </div>
    )

}