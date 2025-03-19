import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner.jsx";
import ExchangeRateDisplay from "../exchangeratedisplay/ExchangeRateDisplay.jsx";
import AmountDisplay from "../amountdisplay/AmountDisplay.jsx";
import { VatValidationContext } from "../../context/VatValidationContext";

const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState("1.00");
    const [lastUpdated, setLastUpdated] = useState("");
    const [exchangeRate, setExchangeRate] = useState(1.0627478);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getCurrencyName, formatDate } = useContext(VatValidationContext);

    const fetchRates = async (baseCurrency = "EUR") => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.vatcomply.com/rates?base=${baseCurrency}`
            );
            const rates = response.data.rates;
            setExchangeRate(rates[toCurrency]);
            setLastUpdated(new Date().toISOString());
            setError(null);
        } catch (err) {
            setError("Error fetching rates");
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    useEffect(() => {
        fetchRates(fromCurrency);
    }, [fromCurrency, toCurrency]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <AmountDisplay />
            <div className="bg-white shadow-lg rounded-lg p-15 w-full max-w-screen-xl max-xl:mt-70 max-xl:mr-10 max-xl:ml-10 border-gray-200 z-1 mt-50 max-md:w-90 max-md:p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <Spinner />
                    </div>
                ) : (
                    <ExchangeRateDisplay
                        fromCurrency={fromCurrency}
                        toCurrency={toCurrency}
                        exchangeRate={exchangeRate}
                        amount={amount}
                        setAmount={setAmount}
                        setFromCurrency={setFromCurrency}
                        setToCurrency={setToCurrency}
                        lastUpdated={lastUpdated}
                        setLastUpdated={setLastUpdated}
                    />
                )}
            </div>
            <div className="text-sm font-semibold mt-4">
                {lastUpdated && (
                    <div className="min-md:hidden min-md:text-center min-md:p-10 mt-2 text-end text-sm text-gray-600 max-md:p-5 max-md:text-center">
                        {getCurrencyName(fromCurrency)} to {getCurrencyName(toCurrency)} conversion — Last updated {formatDate(lastUpdated)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;










