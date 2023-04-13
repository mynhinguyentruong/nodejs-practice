'use client'
import { useState } from 'react'

export default function Page() {

  const [url, setUrl] = useState('')
  console.log(url)

  async function handleSubmit(e: any): Promise<any> {
    e.preventDefault()
    console.log(url)
    let raw = JSON.stringify({
      "url": url
    });
    try {
      const res = await fetch('http://localhost:9000/url', {
        method: 'PUT',
        body: raw,
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(e: any): void {
    setUrl(e.target.value)
    console.log(url)
  }

  return (
      <div className="container px-8 py-12 h-screen bg-gray-100 m-z">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl"
              onSubmit={handleSubmit}
        >
          <div className="m-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              URL
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              id="url"
              onChange={handleChange}
              value={url}
              name={url}
              placeholder="https://www.google.com"
            />
            <button
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 block mt-2 w-full appearance-none leading-normal"
              type='submit'>
              Submit
            </button>
          </div>


        </form>
      </div>
  )
}
