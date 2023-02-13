import { useEffect, useState } from 'react';
import './App.css'
import useWeather from './hooks/useWeather';

function App() {
   //importando respuesta de la API , funcion de cambio de temperatura del boton y verificacion de temperatura para modificacion 
   const {weather , changeTemp , isTemp} = useWeather();

   //hourIcon es para modificar instantaneamente los colores y fondo segun el horario
   const hourIcon = weather.weather?.[0]?.icon

   document.body.classList = `${hourIcon?.includes("n") ? 'night-body-background' : 'day-body-background'}`

   //Para realizar una carga antes de mostrar la respuesta y que no se vea incompleta
   const [load,setLoad] = useState(false)
   useEffect(()=>{
      setLoad(true)
      setTimeout(()=>{
         setLoad(false)
      },5000)
   },[])
  
   return (
      <>
      {load ? 
      <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="icon weather" /> : 
      <div className={`App ${hourIcon?.includes("n") ? 'night' : 'day'}`}>
         <h2 className='city'>{`${weather.name}, ${weather.sys?.country}`}</h2>
         <img src={`http://openweathermap.org/img/wn/${hourIcon}@4x.png`} alt="icon weather" />
         <h2 className='temperature'>{`${Math.floor(weather.main?.temp)}${isTemp ? 'C°' : 'F°'}`}</h2>
         <h2 className='description'>"{weather.weather?.[0]?.description}"</h2>
         <h2 className='wind'>Wind Speed: <span>{weather.wind?.speed}</span></h2>
         <h2 className='humidity'>Humidity: <span>{weather.main?.humidity}%</span></h2>
         <h2 className='clouds'>Clouds: <span>{weather.clouds?.all}%</span></h2>
         <h2 className='pressure'>Pres: <span>{weather.main?.pressure}/hPa</span></h2>
         <button style={{cursor: 'pointer'}} onClick={changeTemp}>C° to F°</button>
   </div>
   }
      </>
      
   ) 
}

export default App
