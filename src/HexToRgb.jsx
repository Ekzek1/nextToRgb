import React , { useState } from 'react'
import { useMemo } from 'react';

const HexToRgb = () => {

  const [nexInput, setNexInput] = useState('#'); 
  const [colorRgb, setColorRgb] = useState('');
  const [error, setError] = useState('');

  function hex2rgb(c) {
    let  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);

    result  = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null

    if(result == null){
      setError('Oшибка!');
    }else{
      let rgba = `rgb(${result.r}, ${result.g}, ${result.b})`;
      setColorRgb(rgba);
      setError('')
      return {
        backgroundColor: `rgb(${result.r - 10}, ${result.g - 10}, ${result.b - 10})`,
        borderColor: rgba,
        color: result.r >= 235 && result.g >= 235 && result.b >= 235 ? '#000000' : null,
      }
    }
  }

  const colorRgbMemo = useMemo(() => {
    if(nexInput.length > 6){
      const rgba = hex2rgb(nexInput.slice(1));
      return rgba
    }
  }, [nexInput])
  
  return (
    <div className='color__body' style={{backgroundColor: colorRgb}}>
      <input type="text" className='color__nex' value={nexInput} onChange={(e) => setNexInput(e.target.value)}/>
      <div className={error ? "color__err" : "color_rgb"} style = {colorRgbMemo}> {error ? error : colorRgb}</div>
    </div>
  )
}

export default HexToRgb