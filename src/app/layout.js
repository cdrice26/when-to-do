import { Inter } from 'next/font/google';
import NavButton from '../components/NavButton';
import { CiCalendar, CiClock2, CiHome, CiSettings } from 'react-icons/ci';
import { LiaTasksSolid } from 'react-icons/lia';
import { ContextProvider } from '../constants/context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WhenToDo',
  description: 'Simple task scheduler'
};

/**
 * Root layout component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @return {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ContextProvider>
          <nav className='bg-blue-500 w-full p-5 text-2xl text-white drop-shadow-md sticky top-0'>
            WhenToDo
          </nav>
          <div className='flex-grow flex flex-col-reverse sm:flex-row'>
            <aside
              className='w-full sm:w-[100px] sm:shadow-md flex flex-row space-x-4 sm:space-x-0 sm:space-y-4
                            justify-center sm:justify-start sm:flex-col p-2 bg-gray-100 sm:bg-white
                            fixed sm:relative bottom-0'
            >
              <NavButton icon={<CiHome size={35} />} text='Home' page='/' />
              <NavButton
                icon={<CiCalendar size={35} />}
                text='Events'
                page='/availability'
              />
              <NavButton
                icon={<LiaTasksSolid size={35} />}
                text='Tasks'
                page='/'
              />
              <NavButton
                icon={<CiClock2 size={35} />}
                text='Schedule'
                page='/'
              />
              <NavButton
                icon={<CiSettings size={35} />}
                text='Settings'
                page='/'
              />
            </aside>
            <main className='flex-grow flex p-4'>{children}</main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
