"use client"
import Image from 'next/image';
import React, { useState } from 'react'

const FormCreate = ({ options, addData }) => {
  const [postData, setPostData] = useState({})

  const handleInput = (e, fieldName) => {
    setPostData({
      ...postData,
      [fieldName]: e.target.value === "" ? undefined : e.target.value
    });
  };

  const handlePost = () => {
    addData(postData)
    setPostData({})
  }

  const handleFileInput = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostData({
        ...postData,
        [fieldName]: reader.result // menyimpan base64 di state
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='w-full bg-white border border-gray-300 shadow-xl flex justify-center items-center gap-2 px-2 py-4 flex-col rounded-lg'>
        {options.map((row, index) => {
          if (row.type !== "select" && row.type !== 'file') {
            return (
              <div className='flex justify-center items-center w-full' key={index}>
                <input type={row.type} placeholder={row.placeholder} name={row.name} value={postData[row.name] || ""} onChange={(e) => handleInput(e, row.name)} className='block py-2.5 px-2 w-2/3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer' required />
              </div>
            )
          } else if (row.type === 'select') {
            return (
              <div className='flex justify-center items-center w-full' key={index}>
                <select name={row.name} value={postData[row.name] || ''} onChange={(e) => handleInput(e, row.name)} className='block py-2.5 px-2 w-2/3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer' required>
                  <option value="">-- select --</option>
                  {row.option.map((opt, i) => {
                    return (
                      <option value={opt} key={i}>
                        {opt}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          } else {
            return (
              <div className='flex justify-center items-center w-full' key={index}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-2/3 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {postData[row.name] === undefined ? (
                      <>
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Image</p>
                      </>
                    ) : (
                      <Image src={postData[row.name]} width={256} height={256} className='w-auto h-60 object-cover' alt='photo' />
                    )}
                  </div>
                  <input id="dropzone-file" type="file" name={row.name} accept="image/*" onChange={(e) => handleFileInput(e, row.name)} className="hidden" />
                </label>
              </div>
            )
          }
        })}
        <button className='py-2 bg-blue-500 px-4 rounded-lg text-white font-bold' onClick={handlePost}>Submit</button>
      </div>
    </>
  )
}

export default FormCreate