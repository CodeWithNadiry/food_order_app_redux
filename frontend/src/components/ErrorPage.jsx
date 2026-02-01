const ErrorPage = ({title, message}) => {
  return (
    <div className='w-[90%] max-w-100 my-2 mx-auto p-1 bg-[#f9b8b8] text-[#6d0b0b] rounded-sm'>
        <h2 className="m-0">{title}</h2>
        <p className="m-0">{message}</p>
    </div>
  )
}

export default ErrorPage