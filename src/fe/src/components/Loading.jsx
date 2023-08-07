import React from 'react'
import { Audio } from 'react-loader-spinner'
const Loading = () => {
  return (
    <div align="center">
      <Audio
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default Loading
