import { useMemo, useState } from "react";
import Fuse from "fuse.js";

export function useFuse(searchTerm: string, items: any[], options = {}) {
  const fuse = new Fuse(items, options);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  useMemo(() => {
    const items = fuse.search(searchTerm);
    setSuggestions(items);
  }, [searchTerm]);

  return suggestions;
}
