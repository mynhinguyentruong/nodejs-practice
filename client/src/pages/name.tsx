
export default function Page() {

  return (
      <div className="container px-8 py-12 h-screen bg-gray-100 m-z">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
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
              // onChange={}
              // value={}
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
