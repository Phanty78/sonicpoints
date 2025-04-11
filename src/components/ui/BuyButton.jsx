import { Button } from '@/components/ui/button';

export default function BuyButton() {
  return (
    <Button className="bg-sonic-gradient hover:border-sonic-gradient mt-2 text-base font-bold text-white transition-all hover:scale-110 hover:border hover:border-black hover:text-black hover:opacity-80">
      <a
        href="https://spinner.so/agent/0xabAA0C5dbfe31f20912864c40bc2d1C9aA286922"
        target="blanck"
        rel="noopener noreferrer"
      >
        Buy SPT
      </a>
    </Button>
  );
}
