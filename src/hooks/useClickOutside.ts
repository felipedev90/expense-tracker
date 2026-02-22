import { useEffect, type RefObject } from "react";

/*
Hook que detecta cliques fora de um elemento.
@param ref - Referência ao elemento DOM
@param handler - Função executada quando clica fora
*/

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Se o elemento existe E o clique foi fora dele
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    // Adiciona listener global
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup do listener ao desmonstar
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
