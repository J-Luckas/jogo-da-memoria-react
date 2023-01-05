import { useEffect, useRef, useState } from "react"

export const Temporizador = ({ tempo, handleResetar }: { tempo: number, handleResetar: () => void }) => {

  const [ cronometro, setCronometro ] = useState(tempo);

  const id = useRef<{intervalo: NodeJS.Timer}>({ intervalo: 0 as unknown as NodeJS.Timer });
  const clear=()=>{
    clearInterval(id.current.intervalo);
  }

  const iniciarTimer = () => {
    id.current.intervalo = setInterval(()=>{
      setCronometro((time)=>time-1)
    },1000);
    
    return ()=>clear();
  }

  useEffect(()=>{
    iniciarTimer();
  },[])  

  useEffect( () => {
    if( cronometro <= 0 ){ 
      alert('O tempo acabou!')
      clearInterval(id.current.intervalo);
      handleResetar();
      setCronometro(tempo);
      iniciarTimer();
    }
  },[ cronometro ] )  

  return (
    <div className="temporizador">Cronômetro: {cronometro}</div>
  )
}