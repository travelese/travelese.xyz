import { useRouter, useSearchParams } from "next/navigation";
import type { Offer, Order } from "@duffel/api/types";

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

  const navigateToBookPage = (offer: Offer) => {
    router.push(`/travel/fly/book?id=${offer.id}`);
  };

  return {
    navigateToFlightsPage,
    navigateToBookPage,
  };
}
