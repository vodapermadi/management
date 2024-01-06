"use client"
import React, { useState } from 'react'

const FormCreate = ({ options,addData }) => {
  const [postData, setPostData] = useState({})

  const handleInput = (e, fieldName) => {
    setPostData({
      ...postData,
      [fieldName]: e.target.value
    });
  };

  const handlePost = () => {
    addData(postData)
    setPostData({})
  }

  return (
    <>
      <div className='w-full bg-white border border-gray-300 shadow-xl flex justify-center items-center gap-2 px-2 py-4 flex-col rounded-lg'>
        {options.map((row, index) => {
          return (
            <div className='flex justify-center items-center w-full' key={index}>
              <input type={row.type} placeholder={row.placeholder} name={row.name} value={postData[row.name] || ''} onChange={(e) => handleInput(e, row.name)} className='rounded-md border border-gray-300 focus:border-secondary focus:outline-none p-2 w-2/3' required />
            </div>
          )
        })}
        <button className='py-2 bg-blue-500 px-4 rounded-lg text-white font-bold' onClick={handlePost}>Submit</button>
      </div>
    </>
  )
}

export default FormCreate