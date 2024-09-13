import css from "./ErrorMessage.module.css"

const ErrorMessage = ({message}) => {
  return (
    <div>
          <p className={css.error}>{message}</p>
    </div>
  )
}

export default ErrorMessage
