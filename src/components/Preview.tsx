"use client"

import dynamic from 'next/dynamic'
import "react-quill/dist/quill.bubble.css"


interface IProps{
    value: string
}
import React, { useMemo } from 'react'

const Preview = ({value}: IProps) => {
    const ReactQuill = useMemo(()=> dynamic(()=> import("react-quill"), {ssr: false}), [])

  return (
        <ReactQuill
            theme='bubble'
            value={value}
            readOnly
        />
  )
}

export default Preview