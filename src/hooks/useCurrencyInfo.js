import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    // Ensure the currency is defined before making the API call
    if (!currency) return;

    const fetchCurrencyInfo = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`
        );
        const json = await res.json();

        // Ensure the currency data exists in the response
        if (json[currency]) {
          setData(json[currency]);
        } else {
          console.error("Currency data not found in response", json);
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyInfo();
  }, [currency]);

  // Debugging log after state update
  useEffect(() => {
    console.log("Currency data updated:", data);
  }, [data]);

  return data;
}

export default useCurrencyInfo;
