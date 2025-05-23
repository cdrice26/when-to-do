import { Inter } from 'next/font/google';
import NavButton from '../components/general/NavButton.tsx';
import { IoSettingsOutline } from 'react-icons/io5';
import {
  LiaTasksSolid,
  LiaHomeSolid,
  LiaClockSolid,
  LiaCalendar
} from 'react-icons/lia';
import { ContextProvider } from '../constants/context.tsx';
import './globals.css';
import { JSX } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WhenToDo',
  description:
    'A simple task scheduler that takes driving time and weather into account'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @return {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} h-sm-screen flex flex-col overflow-hidden`}
      >
        <ContextProvider>
          <nav className='bg-blue-500 w-full p-5 text-2xl text-white drop-shadow-md z-50'>
            WhenToDo
          </nav>
          <div className='flex flex-grow flex-col-reverse relative sm:flex-row h-full overflow-hidden'>
            <aside
              className='w-full sm:w-[100px] sm:shadow-md flex flex-row space-x-4 sm:space-x-0 sm:space-y-4
                            justify-center sm:justify-start sm:flex-col p-2 bg-blue-500 sm:bg-white
                            sticky sm:relative bottom-0 z-[49] pb-6 sm:pb-0'
            >
              <NavButton
                icon={
                  <LiaHomeSolid
                    size={35}
                    className='text-white sm:text-current'
                  />
                }
                text='Home'
                page='/'
              />
              <NavButton
                icon={
                  <LiaCalendar
                    size={35}
                    className='text-white sm:text-current'
                  />
                }
                text='Events'
                page='/availability'
              />
              <NavButton
                icon={
                  <LiaTasksSolid
                    size={35}
                    className='text-white sm:text-current'
                  />
                }
                text='Tasks'
                page='/tasks'
              />
              <NavButton
                icon={
                  <LiaClockSolid
                    size={35}
                    className='text-white sm:text-current'
                  />
                }
                text='Schedule'
                page='/schedule'
              />
              <NavButton
                icon={
                  <IoSettingsOutline
                    size={35}
                    className='text-white sm:text-current'
                  />
                }
                text='Settings'
                page='/settings'
              />
            </aside>
            <main className='flex-grow p-4 overflow-y-auto bg-white'>
              {children}
            </main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
