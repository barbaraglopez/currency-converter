import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const VatValidationContext = createContext();

const VatValidationProvider = ({ children }) => {
    const [vatInfo, setVatInfo] = useState(null);
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVatInfo = async (vatNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.vatcomply.com/vat?vat_number=${vatNumber}`
            );
            setVatInfo(response.data);
            setError(null);
        } catch (err) {
            setError("Error fetching VAT data");
        } finally {
            setLoading(false);
        }
    };

    const getCurrencyName = (currency) => {
        const currencyNames = {
            "EUR": "Euro",
            "USD": "US Dollars",
            "JPY": "Japanese Yen",
            "BGN": "Bulgarian Lev",
            "CZK": "Czech Koruna",
            "DKK": "Danish Krone",
            "GBP": "British Pound",
            "HUF": "Hungarian Forint",
            "PLN": "Polish Zloty",
            "RON": "Romanian Leu",
            "SEK": "Swedish Krona",
            "CHF": "Swiss Franc",
            "ISK": "Icelandic Króna",
            "NOK": "Norwegian Krone",
            "HRK": "Croatian Kuna",
            "RUB": "Russian Ruble",
            "TRY": "Turkish Lira",
            "AUD": "Australian Dollar",
            "BRL": "Brazilian Real",
            "CAD": "Canadian Dollar",
            "CNY": "Chinese Yuan",
            "HKD": "Hong Kong Dollar",
            "IDR": "Indonesian Rupiah",
            "ILS": "Israeli New Shekel",
            "INR": "Indian Rupee",
            "KRW": "South Korean Won",
            "MXN": "Mexican Peso",
            "MYR": "Malaysian Ringgit",
            "NZD": "New Zealand Dollar",
            "PHP": "Philippine Peso",
            "SGD": "Singapore Dollar",
            "THB": "Thai Baht",
            "ZAR": "South African Rand",
        };

        return currencyNames[currency] || currency;
    };

    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        const options = {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
        };
        return date.toLocaleString("en-US", options);
    }, []);

    const fetchRates = async (baseCurrency = "EUR") => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.vatcomply.com/rates?base=${baseCurrency}`
            );
            setRates(response.data);
            setError(null);
        } catch (err) {
            setError("Error fetching rates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    return (
        <VatValidationContext.Provider
            value={{
                vatInfo,
                fetchVatInfo,
                rates,
                loading,
                error,
                fetchRates,
                getCurrencyName,
                formatDate,
            }}
        >
            {children}
        </VatValidationContext.Provider>
    );
};

export { VatValidationProvider, VatValidationContext };


