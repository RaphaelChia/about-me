import { useEffect, useState } from 'react';

type KeybindListenerProps = {
  targetKey?: string;
  callback?: (event: globalThis.KeyboardEvent) => void;
  modifiers?: {
    ctrl?: boolean;
    meta?: boolean;
    alt?: boolean;
    shift?: boolean;
  };
  ignoreInputCheck?: boolean; // Means when you are typing in an input field, it will ignore the keybind if false
  onUpDown?: 'keyup' | 'keydown';
};

const useKeybindListener = ({
  targetKey,
  callback,
  modifiers,
  ignoreInputCheck = false,
  onUpDown = 'keyup',
}: KeybindListenerProps = {}) => {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      if (!targetKey) return;
      if (
        ignoreInputCheck ||
        (!(event.target instanceof HTMLInputElement) &&
          !(event.target instanceof HTMLTextAreaElement))
      ) {
        if (event.key.toLowerCase() !== targetKey.toLowerCase()) return;

        if (modifiers) {
          let isSatisfied = false;
          if (modifiers.ctrl && event.ctrlKey) isSatisfied = true;
          if (modifiers.meta && event.metaKey) isSatisfied = true;
          if (modifiers.alt && event.altKey) isSatisfied = true;
          if (modifiers.shift && event.shiftKey) isSatisfied = true;
          if (!isSatisfied) return;
        }
        setKeyPressed(event.key);
        callback?.(event);
      }
    };

    window.addEventListener(onUpDown, handler);

    return () => {
      window.removeEventListener(onUpDown, handler);
    };
  }, [targetKey, callback, modifiers, ignoreInputCheck, onUpDown]);

  return keyPressed;
};

export default useKeybindListener;
