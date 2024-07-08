"use client"

import dynamic from 'next/dynamic'
import "react-quill/dist/quill.snow.css"


interface IProps{
    onChange: (value: string)=> void,
    value: string
}
import React, { useMemo } from 'react'

const Editor = ({value, onChange}: IProps) => {
    const ReactQuill = useMemo(()=> dynamic(()=> import("react-quill"), {ssr: false}), [])

  return (
    <div className='bg-white'>
        <ReactQuill
            theme='snow'
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Editor