import { ModeToggle } from '@/components/ui/ModeToggle';

export default function Header() {
  return (
    <header className="container mx-auto flex w-full max-w-[400px] items-center justify-between rounded-lg border-2 border-gray-300 p-4">
      <h1>SonicPoints</h1>
      <ModeToggle />
    </header>
  );
}
