"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa";
import Switch from "react-switch";

import { Skelton } from "@/components/atoms/Skelton";
import { useMount } from "@/hooks/useMount";

const useSwitch = (isMounted: boolean) => {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const isSystem = theme === "system";
  const isChecked = resolvedTheme === "dark";

  const handleToggleSwitch = useCallback(() => {
    setTheme(isChecked ? "light" : "dark");
  }, [isChecked, setTheme]);

  useEffect(() => {
    let isCleanup = false;
    // 初回はtheme="system"なのでスキップ
    if (!isCleanup && !isSystem) {
      setTheme(isChecked ? "dark" : "light");
    }

    return () => {
      isCleanup = true;
    };
  }, [isChecked, isMounted, isSystem, setTheme]);

  return { handleToggleSwitch, isChecked, isMounted };
};

export const ThemeSwitch: React.FC = () => {
  const isMounted = useMount();
  const { handleToggleSwitch, isChecked } = useSwitch(isMounted);

  if (!isMounted) return <Skelton className="h-6 w-12" />;

  return (
    <Switch
      onChange={handleToggleSwitch}
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
