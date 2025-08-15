import { Route, Routes } from "react-router";
import Gallery from "./components/gallery";
import Header from "./components/header";


export default function App() {

  return (

    <>
      
      <Routes>
        <Route path="" element={<Header />}/>
        <Route path="gallery" element={<Gallery/>}/>
      </Routes>
    </>

  );
}
