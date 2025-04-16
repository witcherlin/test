import { hydrateRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';

import { main } from './main';

const queryClient = new QueryClient();

hydrateRoot(document.getElementById('root')!, main(queryClient));
