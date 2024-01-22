import { useRouter } from "next/router.js";
import useSWR from "swr";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import PackingList from "@/components/PackingList";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: trip, isLoading, error } = useSWR(`/api/trips/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2>{trip.destination}</h2>
      <strong>Start:</strong> {formatDate(trip.start)} | <strong>End:</strong>
      {formatDate(trip.end)}
      <Image
        src={trip.imageURL}
        width={300}
        height={200}
        alt={trip.destination}
      />
      <p>
        <strong>Notes:</strong> {trip.notes}
      </p>
      <PackingList />
    </>
  );
}
