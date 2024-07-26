import { useRouter, useSearchParams } from "next/navigation";
import type { Offer } from "@duffel/api/types";

export default function useNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateToSearchPage(
    queryParams: Record<string, string | number | boolean>,
  ) {
    const current = new URLSearchParams(
      searchParams ? Array.from(searchParams.entries()) : [],
    );
    Object.entries(queryParams).forEach(([key, value]) => {
      current.set(key, String(value));
    });

    const path = "/travel/search?" + current.toString();
    router.push(path);
  }

  const navigateToBookPage = (offer: Offer) => {
    router.push(`/travel/book?id=${offer.id}`);
  };

  return {
    navigateToSearchPage,
    navigateToBookPage,
  };
}
