import { useState } from "react"

export const Temporizador = ({ tempo }: { tempo: number }) => {

  const [ cronometro, setCronometro ] = useState(tempo);

  setInterval( () =>{
    setCronometro(cronometro - 1);
  }, 1000 );

  return (
    <div className="temporizador">Cronômetro: {cronometro}</div>
  )
}