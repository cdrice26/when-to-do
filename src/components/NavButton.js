import Link from 'next/link';

/**
 * Renders a button that acts as a navigation link.
 *
 * @param {Object} param0 - The props for the NavButton component.
 * @param {string} param0.text - The text to display on the button.
 * @param {string} param0.page - The url of the page to navigate to when the button is clicked.
 * @param {ReactNode} param0.icon - The icon to display on the button.
 * @returns {JSX.Element} The rendered NavButton component.
 */
export default function NavButton({ text, page, icon }) {
  return (
    <Link href={page} passHref>
      <button className='flex flex-col justify-center items-center w-full rounded-lg hover:bg-gray-200 p-4'>
        {icon}
        {text}
      </button>
    </Link>
  );
}
