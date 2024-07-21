export default function NavButton({ text, icon }) {
  return (
    <button className='flex flex-col justify-center items-center w-full rounded-lg hover:bg-gray-200 p-4'>
      {icon}
      {text}
    </button>
  );
}
