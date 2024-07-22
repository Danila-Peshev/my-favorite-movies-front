function Home() {
  return (
      <div className='w-full text-center mt-96'>
        <div>
        <h1 className='text-4xl font-bold'>Welcome to my favorite movies</h1>
        </div>
        <div className='mt-10'>
          <button 
            onClick={() => localStorage.setItem("auth", "false")}
            className='border-2 border-black rounded w-20 
          hover:bg-black hover:border-gray-300 hover:text-white'>Logout</button>
        </div>
      </div>
  )
}

export default Home;