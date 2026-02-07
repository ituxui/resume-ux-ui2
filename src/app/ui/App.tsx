import { Outlet, ScrollRestoration, } from 'react-router';

export function App() {
  return (<>
    <Outlet />
    <ScrollRestoration />
  </>
  )
}



// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
