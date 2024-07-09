import { useRouter, useSearchParams } from "next/navigation";

export default function useNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateToFlightsPage(
    queryParams: Record<string, string | number | boolean>,
  ) {
    const current = new URLSearchParams(
      searchParams ? Array.from(searchParams.entries()) : [],
    );
    Object.entries(queryParams).forEach(([key, value]) => {
      current.set(key, String(value));
    });

    const path = "travel/fly/search?" + current.toString();
    router.push(path);
  }

  const navigateToBookPage = (offerId: string) => {
    router.push(`/travel/fly/book?id=${offerId}`);
  };

  return {
    navigateToFlightsPage,
    navigateToBookPage,
  };
}
