// File: /src/hooks/navigation.ts
// Description: This file contains the hook for navigation.

import { useRouter } from 'next/navigation';

const useNavigation = () => {
  const router = useRouter();

  const navigateToFlightsPage = (queryParams: Record<string, any>) => {
    const path = '/fly?' + new URLSearchParams(queryParams).toString();
    console.log("Navigating to:", path);
    router.push(path);
  };

  return {
    navigateToFlightsPage,
  };
};

export default useNavigation;
