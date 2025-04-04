import { DisplayDifference } from '@/utils/utils';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Image from 'next/image';

export default function RingSection({ ringData, localData, ringPoints }) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/ring.svg" alt="Ring" width={20} height={20} />
        <h3 className="text-ring-gradient text-xl font-bold">Ring Points</h3>
      </div>
      {ringData ? (
        <p>
          <strong>Ring Points:</strong> {ringPoints}{' '}
          {localData && ringData && (
            <Tooltip>
              <TooltipTrigger>
                {DisplayDifference(
                  ringData.total.slice(0, -36),
                  localData.ringData.ringPoints
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>Ring points difference since last update</p>
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
