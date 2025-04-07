import { FaXTwitter } from 'react-icons/fa6';

export default function SocialsLinks() {
  return (
    <ul className="flex flex-row items-center justify-center gap-4">
      <li>
        <a
          href="https://x.com/DevPhanty"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter
            size={30}
            className="rounded-full bg-black p-1 text-white transition-all duration-300 hover:scale-110 dark:bg-white dark:text-black"
          />
        </a>
      </li>
    </ul>
  );
}
