import { useState } from "react";

function App() {
  const [checked, setChecked] = useState(false);
  // localStorage.setItem('email', 'example@gmail.com')
  // localStorage.setItem('password', 'OBvabp9egp-=18((&_8**Y99v7-')

  return (
    <div className="h-96 w-1/4 bg-white border border-teal-200 shadow-xl mt-60 mx-auto">
      <div className="my-10 w-4/5 mx-auto">
        <div className="flex flex-col mx-auto">
          <label className="left">Имя пользователя или e-mail</label>
          <input type="text" className="border border-neutral-300 shadow-sm h-10"></input>
        </div>
        <div className="flex flex-col mx-auto my-5">
          <label>Пароль</label>
          <input type="password" className="border border-neutral-300 shadow-sm h-10"></input>
        </div>
        <div className="">
            <label><input 
              type="checkbox" 
              checked={checked} 
              onChange={() => setChecked(!checked)}>
            </input>Запомнить меня</label>
            <button className="bg-blue-500 h-10 w-20 radius rounded text-white">Войти</button>
        </div>
      </div>
        <a href="#">Забыли пароль?</a>
    </div>
  );
}

export default App;
