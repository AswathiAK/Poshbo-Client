import React, { useEffect, useState } from 'react'

const useCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [secondsLeft]);
  const startCountdown = (seconds) => {
    setSecondsLeft(seconds);
  };
  return { secondsLeft, startCountdown };
}

export default useCountdown
