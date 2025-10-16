import React from 'react';
import MyButtom from './MyButtom';
import './TresBotones.css';

export default function TresBotones(){
  return (
    <div className="tres-botones">
      <MyButtom nombre="Choose" mensaje="Has pulsado Choose"/>
      <MyButtom nombre="One" mensaje="Has pulsado One" />
      <MyButtom nombre="Option" mensaje="Has pulsado Option" />
    </div>
  );
}
