import { useState } from "react";
import logo from "./components/assets/1.jpg"

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <>
    <div className="w-1/4 mt-20 mx-auto">
    <img src={logo} className="mx-auto size-40 mb-10 rounded-full"></img>
    <div className="h-80 bg-white border border-zinc-500 shadow-xl rounded">
      <div className="my-10 w-11/12 mx-auto">
        <div className="flex flex-col mx-auto">
          <label className="left">Имя пользователя или e-mail</label>
          <input type="text" className="border border-neutral-300 shadow-sm h-10 text-lg"></input>
        </div>
        <div className="flex flex-col mx-auto my-5">
          <label>Пароль</label>
          <input type="password" className="border border-neutral-300 shadow-sm h-10 text-2xl"></input>
        </div>
        <div className="flex relative my-10 items-center">
            <input 
              type="checkbox" 
              checked={checked} 
              onChange={() => setChecked(!checked)}
              className="size-5 rounded-none border-none border-neutral-300 mr-4">
            </input>
            <label>Запомнить меня</label>
            <div className="grow"></div>
            <button className="bg-blue-500 h-10 w-20 rounded text-white hover:bg-white hover:text-black hover:border hover:border-black">Войти</button>
        </div>
      </div>
    </div>
    <div className="mt-5">
      <a href="#" className="ml-5">Забыли пароль?</a>
    </div>
    </div>
    </>
  );
}

export default App;
