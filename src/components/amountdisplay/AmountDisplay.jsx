import { useContext } from "react";
import { VatValidationContext } from "../../context/VatValidationContext.jsx";
import "./AmountDisplay.css";

const AmountDisplay = ({ amount, fromCurrency, toCurrency }) => {
    const { getCurrencyName } = useContext(VatValidationContext);

    return (
        <div className="bg-[#1A8DFF] pt-30 pb-30 p-10 w-full text-center text-3xl text-white font-bold absolute z-0">
            {amount} {fromCurrency} to {toCurrency} - Convert {getCurrencyName(fromCurrency)} to {getCurrencyName(toCurrency)}
        </div>
    );
};

export default AmountDisplay;

