import { useState, useCallback } from 'react';

type StatusType = 'idle' | 'success' | 'error' | 'pending';

const useRequestStatus = () => {
  const [status, setStatus] = useState<StatusType>('idle');

  const setPending = useCallback(() => setStatus('pending'), []);
  const setSuccess = useCallback(() => setStatus('success'), []);
  const setError = useCallback(() => setStatus('error'), []);

  return { status, setPending, setSuccess, setError };
};

export default useRequestStatus;
