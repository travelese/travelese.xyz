import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  const navigateToFlightsPage = (queryParams: Record<string, any>) => {
    const path = "/fly/search?" + new URLSearchParams(queryParams).toString();
    router.push(path);
  };

  const navigateToBookPage = (offerId: string) => {
    router.push(`/fly/book?id=${offerId}`);
  };

  return {
    navigateToFlightsPage,
    navigateToBookPage,
  };
};

export default useNavigation;
