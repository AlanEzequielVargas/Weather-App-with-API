import { useState,useEffect } from "react";
import axios from 'axios'

function useWeather(){
   const [ weather , setWeather] = useState({});
   const [isTemp , setIsTemp] = useState(true)

   function changeTemp(){
      setIsTemp(!isTemp)
   }

   useEffect(()=>{
      
      function success(position){
         const crd = position.coords;
         const lat = crd.latitude;
         const lon = crd.longitude;
         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7602e6a4f459144e604fdcea42d16f36${isTemp ? '&units=metric' : '&units=imperial'}`)
         .then(res=>setWeather(res.data))
      }  

      /*function error(err) {
         alert(`ERROR(${err.code}): ${err.message}`);
      }
*/
      function options(){
         const options = {
         enableHighAccuracy: true,
         timeout: 1000,
         maximumAge: infinity
       }
       return options.enableHighAccuracy
      } 
      
      navigator.geolocation.getCurrentPosition(success/*, error*/, options);

   },[isTemp]);

   return{weather , changeTemp , isTemp}
}
export default useWeather;
