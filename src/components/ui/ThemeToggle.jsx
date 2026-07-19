import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle(){

  const {theme,toggleTheme}=useTheme();


  return(

    <button
      className="theme-button"
      onClick={toggleTheme}
    >

      {theme==="dark"
        ? "LIGHT MODE"
        : "DARK MODE"
      }

    </button>

  );

}