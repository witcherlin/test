import { renderToString } from "react-dom/server";
import { QueryClient } from '@tanstack/react-query';

import { main } from './main';

export function render() {
  const queryClient = new QueryClient();

  const root = renderToString(main(queryClient));
  
  return {
    root,
  };
}
