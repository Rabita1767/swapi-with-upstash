import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type MapModifiersModifier = string | false | null | undefined | (string | false | null | undefined)[];

function generateModifierClassNameArray(baseClassName: string, ...modifiers: MapModifiersModifier[]): string[] {

    let classNameArray: string[] = [];
  
    for (const modifier of modifiers) {
  
      if (Array.isArray(modifier)) {
  
        classNameArray = classNameArray.concat(generateModifierClassNameArray(baseClassName, ...modifier));
  
      } else if (typeof modifier === 'string' && modifier.length > 0) {
  
        classNameArray.push(baseClassName + '--' + modifier);
  
      }
  
    }
  
   
  
    return classNameArray;
  
  }
  
export function mapModifiers(baseClassName: string, ...modifiers: MapModifiersModifier[]): string {

    return (
      baseClassName +
      ' ' +
      generateModifierClassNameArray(baseClassName, ...modifiers)
        .join(' ')
        .trim()
    ).trim();
  
  }

export const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };
  