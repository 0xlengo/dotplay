import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Definimos el tiempo de inactividad como una constante
const INACTIVITY_TIMEOUT = 600000; // 60 segundos

export const useInactivityTimer = (setFullscreen?: (value: boolean) => void) => {
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.location.pathname !== '/') {
          router.push('/');
        } else if (setFullscreen) {
          setFullscreen(true);
        }
      }, INACTIVITY_TIMEOUT);
    };

    const handleActivity = () => {
      resetTimer();
    };

    resetTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [router, setFullscreen]);
}; 