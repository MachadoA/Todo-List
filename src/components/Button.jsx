import React from 'react';
import style from './Button.module.css'

export default function Button({onClick, label}) {
  return (
    <button className={style.btn} onClick={onClick}>{label}</button>
  )
}
