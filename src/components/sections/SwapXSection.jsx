import { DisplayDifference } from '@/utils/utils';
import Image from 'next/image';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function SwapXSection({ swapxData, localData, gemxAmount }) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/gemx.png" alt="GemX" width={20} height={20} />
        <h3 className="text-gemx-gradient text-xl font-bold">GemX Amount</h3>
      </div>
      {swapxData ? (
        <p>
          <strong>GemX Amount:</strong> {gemxAmount}{' '}
          {localData?.swapxData && swapxData?.result && (
            <Tooltip>
              <TooltipTrigger>
                {DisplayDifference(
                  swapxData.result,
                  localData.swapxData.gemxAmount,
                  false
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>GemX amount difference since last update</p>
              </TooltipContent>
            </Tooltip>
          )}
        </p>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}

// TODO: Bug avec le fetch des data des GemX
