import { useEffect, useState } from "react";

const useLocationData = (route, param = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Prevent setting state after unmount

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                let url = `https://bdapis.com/api/v1.2/${route}`;

                if (param) {
                    url += `/${param}`; // Append parameter dynamically
                }

                const response = await fetch(url);
                const result = await response.json();

                if (isMounted) {
                    setData(result?.data || []);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch data");
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false; // Cleanup to prevent memory leaks
        };
    }, [route, param]); // Re-run when route or param changes

    return { data, loading, error };
};

export default useLocationData;