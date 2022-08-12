import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa";
import Switch from "react-switch";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" ? true : false;

  const [isChecked, setChecked] = useState(isDark);
  const [isMounted, setMounted] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTheme(isChecked ? "dark" : "light");
  }, [isChecked, setTheme]);

  if (!isMounted) return null;

  return (
    <Switch
      onChange={handleChange}
      checked={isChecked}
      aria-label="switch between day and night themes"
      offColor="#555"
      onHandleColor="#eee"
      handleDiameter={20}
      uncheckedIcon={
        <div className="flex h-full items-center justify-center">
          <IconContext.Provider
            value={{
              color: "gold",
              size: "80%",
            }}
          >
            <FaSun />
          </IconContext.Provider>
        </div>
      }
      checkedIcon={
        <div className="flex h-full items-center justify-center">
          <IconContext.Provider
            value={{
              color: "yellow",
              size: "80%",
            }}
          >
            <FaMoon />
          </IconContext.Provider>
        </div>
      }
      height={24}
      width={48}
    />
  );
};

export default ThemeSwitch;
