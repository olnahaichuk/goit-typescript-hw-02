import React from "react";
import css from "./ErrorMessage.module.css"
interface ErrorProps{
  message: string | null; 
}

const ErrorMessage:React.FC<ErrorProps> = ({message}) => {
  return (
    <div>
          <p className={css.error}>{message}</p>
    </div>
  )
}

export default ErrorMessage
