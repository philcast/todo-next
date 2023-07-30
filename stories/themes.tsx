import { ThemesRecord, getCssVariableDeclarations, parseThemes } from "@/lib/theming/plugins/multi-theme-plugin";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const defaultTheme = 'light';

export function ThemeColors() {
  const [themes, setThemes] = useState<ThemesRecord | undefined>(undefined);;
  useEffect(() => {
    const jsonThemes = import("@/lib/theming/themes.json");
    jsonThemes.then((jsonThemes) => {
      setThemes(parseThemes(jsonThemes.default));
    });
  });

  const colors: string[] = useMemo(() => {
    console.log("🚀 ~ file: themes.tsx:16 ~ constcolors:string[]=useMemo ~ themes:", themes);
    if (!themes || !themes[defaultTheme]) {
      return [];
    }
    return Object.keys(getCssVariableDeclarations(themes['light'])).map(key => key.substring(2));
  }, [themes]);
  return (
      <ul className="flex flex-col justify-stretch">
        {colors.map((color) => {
         return (
            <li key={color}
            className={cn('flex items-center justify-between p-4 ring-2', `bg-${color}`)}
            >
            <span className="text-foreground shadow-background text-shadow-md">{color}</span>
          </li>
        )} 
        )}
      </ul>
  );
};
