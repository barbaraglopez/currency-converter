import { useContext, useEffect, useState } from "react";
import "./ExchangeRateDisplay.css";
import InfoMessage from "../infomessage/InfoMessage";
import { VatValidationContext } from "../../context/VatValidationContext";

const ExchangeRateDisplay = ({
    fromCurrency,
    toCurrency,
    amount,
    setAmount,
    setFromCurrency,
    setToCurrency,
    lastUpdated,
    setLastUpdated,
}) => {
    const { rates, error, fetchRates, getCurrencyName, formatDate } =
        useContext(VatValidationContext);
    const [exchangeRate, setExchangeRate] = useState(1);

    useEffect(() => {
        if (fromCurrency) {
            fetchRates(fromCurrency);
        }
    }, [fromCurrency]);

    useEffect(() => {
        if (rates?.rates && toCurrency) {
            setExchangeRate(rates.rates[toCurrency] || 1);
            setLastUpdated(rates.date);
        }
    }, [rates, toCurrency, setLastUpdated]);

    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (!value) value = "0";
        let formattedValue = (parseFloat(value) / 100).toFixed(2);
        setAmount(formattedValue);
    };

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4 relative z-10">
                <div className="flex flex-col w-full md:w-1/4">
                    <label className="text-[#000000] mb-1 text-xl font-bold">Amount</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                        }}
                    />
                </div>

                <div className="flex flex-col w-full md:w-1/4">
                    <label className="text-[#000000] mb-1 text-xl font-bold">From</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {error && <option>{error}</option>}
                        {rates?.rates &&
                            Object.keys(rates.rates).map((currencyCode) => (
                                <option key={currencyCode} value={currencyCode}>
                                    {currencyCode}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex flex-col w-full md:w-1/4 max-md:items-start mt-5 items-center justify-center">
                    <button
                        className="w-12 h-12 bg-white border-2 border-[#177FE5] text-[#177FE5] rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition cursor-pointer"
                        onClick={handleSwapCurrencies}
                    >
                        <img
                            src="src/assets/icons/icon-dollar.png"
                            alt="Swap Currency"
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                <div className="flex flex-col w-full md:w-1/4">
                    <label className="text-[#000000] mb-1 text-xl font-bold">To</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {error && <option>{error}</option>}
                        {rates?.rates &&
                            Object.keys(rates.rates).map((currencyCode) => (
                                <option key={currencyCode} value={currencyCode}>
                                    {currencyCode}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="text-3xl max-lg:text-3xl font-bold p-3 flex flex-col lg:flex-row lg:items-start lg:justify-between w-full h-full mt-10">
                <div className="flex flex-col max-lg:w-full">
                    <p className="w-full max-lg:w-auto text-start">
                        {amount} {getCurrencyName(fromCurrency)} =
                    </p>
                    <p className="w-full max-lg:w-auto text-start">
                        {(parseFloat(amount) * exchangeRate).toFixed(6)}{" "}
                        {getCurrencyName(toCurrency)}
                    </p>
                    <div className="mt-5 text-lg text-[#757575]">
                        1 {fromCurrency} = {(1 * exchangeRate).toFixed(6)} {toCurrency}
                    </div>
                </div>
                <div className="flex flex-col">
                    <InfoMessage className="" />
                    <div className="text-sm font-semibold mt-4">
                        {lastUpdated && (
                            <div className="max-sm:hidden mt-2 text-end text-sm text-gray-600">
                                {getCurrencyName(fromCurrency)} to {getCurrencyName(toCurrency)}{" "}
                                conversion — Last updated {formatDate(lastUpdated)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExchangeRateDisplay;






