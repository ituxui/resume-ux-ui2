import { PageWrapper } from '@shared/ui/wrappers';
import { Outlet, ScrollRestoration, } from 'react-router';

export function App() {
  return (<>
    <PageWrapper>
      <Outlet />
      <ScrollRestoration />
    </PageWrapper>
  </>
  )
}



// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
