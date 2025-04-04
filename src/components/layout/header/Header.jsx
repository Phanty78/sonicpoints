import { ModeToggle } from '@/components/ui/ModeToggle';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="container mx-auto flex w-full max-w-[400px] items-center justify-between rounded-lg border-2 border-gray-300 px-4 py-2">
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo.webp"
          alt="SonicPoints logo"
          width={50}
          height={50}
        />
        <h1 className="text-sonic-gradient text-2xl font-bold">SonicPoints</h1>
      </div>
      <ModeToggle />
    </header>
  );
}
