import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPlaces } from "../Services/apis";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const LIMIT = 8;

const Home = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  // new search -> remount -> places, page and hasMore reset
  return <PlacesList key={q} q={q} />;
};

const PlacesList = ({ q }) => {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showLoader, setShowLoader] = useState(false); // first load only
  const [loaded, setLoaded] = useState(false);

  const fetchPage = async (pageNum, isCancelled = () => false) => {
    try {
      const resp = await getPlaces(q, pageNum, LIMIT);
      if (isCancelled()) return;

      const newPlaces = resp?.data?.data ?? [];
      setPlaces((prev) =>
        pageNum === 1 ? newPlaces : [...prev, ...newPlaces],
      );
      setHasMore(resp?.data?.pagination?.hasNextPage ?? false);
      setPage(pageNum);
    } catch (error) {
      if (isCancelled()) return;
      setHasMore(false); // stop the scroll from retrying in a loop
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  // first page
  useEffect(() => {
    let cancelled = false;

    const loadFirstPage = async () => {
      setShowLoader(true);
      await fetchPage(1, () => cancelled);
      if (!cancelled) {
        setShowLoader(false);
        setLoaded(true);
      }
    };

    loadFirstPage();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {places.length > 0 && (
        <InfiniteScroll
          dataLength={places.length}
          next={() => fetchPage(page + 1)}
          hasMore={hasMore}
          loader={
            <div
              className="flex justify-center my-8"
              role="status"
              aria-label="Loading more places"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 my-10">
              You've seen it all.
            </p>
          }
          style={{ overflow: "visible" }}
        >
          <div className="mt-10 grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.map((place) => (
              <Link key={place._id} to={`/place/${place._id}`}>
                <div className="bg-gray-500 rounded-2xl flex mb-3">
                  <img
                    src={place.photos?.[0]}
                    alt={place.title}
                    className="rounded-2xl aspect-square object-cover w-full"
                  />
                </div>
                <h2 className="text-md font-bold truncate">{place.title}</h2>
                <h3 className="text-sm font-semibold truncate">
                  {place.address}
                </h3>
                <div className="mt-2 font-semibold">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {loaded && places.length === 0 && (
        <div className="flex items-center flex-col mt-16">
          <p className="font-semibold">No places found.</p>
        </div>
      )}

      {showLoader && <Loader />}
    </>
  );
};

export default Home;
