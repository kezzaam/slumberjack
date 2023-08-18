import React, { useContext, useEffect } from 'react';
import LogoHeader from '@/components/LogoHeader';
import Image from 'next/image';
import { DreamContext } from '@/context/DreamContext';
import goals from '@/json/goals.json';
import { useRouter } from 'next/navigation';

export default function SignupGoal() {
  const router = useRouter();

  const { backgroundImage, handleGoalSelection } = useContext(DreamContext) || {};  
  // background image based on goal selection
  useEffect(() => {
    // Update the body's background image style when the backgroundImage value changes
    document.body.style.backgroundImage = `url(${backgroundImage})`;

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, [backgroundImage]);

  const selectGoal = (option: string) => {
    if (handleGoalSelection) {
      handleGoalSelection(option);
    }
    router.push('./defaults');
  };

  return (
    <main className="flex min-h-screen min-w-screen items-center flex-col solid overflow-hidden">
      <LogoHeader />
      <div className="flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold">What is your goal?</h2>

            {/* Goal selection area */}
            <div className="grid grid-cols-2 gap-4 justify-between w-max my-8">
              {/* map over goals object and return image and goal title */}
              {goals.map((goal) => (
                <div className="goal-item" key={goal.name} onClick={() => selectGoal(goal.name)}>
                  <Image
                    src={goal.imageSrc}
                    alt={goal.altText}
                    className="goal rounded-full"
                    width={150}
                    height={150}
                    priority
                  />
                  <h2 className="text-md font-bold text-center p-2">{goal.name}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
