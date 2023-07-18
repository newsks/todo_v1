import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({children}){
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        updateDarkMode(!darkMode);
    };
    useEffect(()=>{
        const isDark =   //딱 한번 다크모드체크
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
         setDarkMode(isDark);   //우산
         updateDarkMode(isDark)
    },[])
    return (
      <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
        {children}
      </DarkModeContext.Provider>)
}

function updateDarkMode(darkMode){
    if(darkMode){
        document.documentElement.classList.add('dark');
        localStorage.theme ='dark';
    } else{
        document.documentElement.classList.remove('dark');
        localStorage.theme ='light'
    }
}
export const useDarkMode =()=> useContext(DarkModeContext)