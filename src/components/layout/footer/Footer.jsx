'use client';

export default function Footer() {
  return (
    <footer className="container mx-auto flex max-w-[400px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-300 p-4">
      <p>
        &copy; {new Date().getFullYear()} Sonic Points - Made by Phanty with ❤️
      </p>
      <p>Sonic Points is completely free and open source.</p>
      <p>
        You want to support the project ? Tips me{' '}
        <strong className="animate-shake">
          <a
            href="https://sonicscan.org/address/0x627f52AB9e0B55ECe09ED77d3bb8a6B2be0c23DF"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </strong>
      </p>
    </footer>
  );
}
