import React from 'react'
import { BallTriangle } from  'react-loader-spinner'

const LoginSpinner = () => {
  return (
    <div align="centery">
        <BallTriangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
    />
    </div>
  )
}

export default LoginSpinner
