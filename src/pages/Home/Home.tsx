import { useContext, useEffect } from "react";
import { Context } from "../..";
import { ObservableArrayAdministration } from "mobx/dist/internal";
import { observer } from "mobx-react-lite";


function Home() {

  const {store} = useContext(Context);

  return (
      <div className='w-full text-center mt-96'>
        <div>
        <h1 className='text-4xl font-bold'>Пользователь {store.user.email}, добро пожаловать на сайт "Моё любимое кино"!</h1>
        </div>
        <div className='mt-10'>
          <button 
            onClick={() => store.logout()}
            className='border-2 border-black rounded w-20 
          hover:bg-black hover:border-gray-300 hover:text-white'>Logout</button>
        </div>
      </div>
  )
}

export default observer(Home);