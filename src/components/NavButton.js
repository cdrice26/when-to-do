import Link from 'next/link';
import PropTypes from 'prop-types';

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
      <button
        className='flex flex-col justify-center items-center flex-grow max-w-[100px] sm:w-full p-2
                       hover:bg-blue-600 sm:hover:bg-gray-200 active:bg-blue-700 sm:active:bg-gray-300 rounded-lg'
      >
        <div className='text-2xl'>{icon}</div>
        <span className='text-xs md:text-base text-white sm:text-current'>
          {text}
        </span>
      </button>
    </Link>
  );
}

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};
