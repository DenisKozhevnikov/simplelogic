import { useCallback, useState } from "react";

export function useTagSelect(defaultTag: string) {
  const [selectedTag, setSelectedTag] = useState(defaultTag);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const select = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return { selectedTag, isOpen, open, close, select };
}
