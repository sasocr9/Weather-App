import { useEffect, useState } from "react";

function useGeo(query) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const Key = "ef2b0344b3639d1f1e41f596f5cd8b13";

  useEffect(() => {
    const controller = new AbortController();

    const signal = controller.signal;

    async function getGeo() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `  https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${Key}
        `,
          signal
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching Movies");

        const data = await res.json();

        // if (data.Response === "False") throw new Error("Movie not found");

        // console.log(data);

        setCities(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 2) {
      setCities([]);
      setError("");
      return;
    }

    getGeo();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { cities, isLoading, error };
}

export default useGeo;
