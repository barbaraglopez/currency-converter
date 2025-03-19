import './InfoMessage';

const InfoMessage = ({ message }) => (
    <div className="bg-[#E8F3FF] rounded-md text-gray-600 text-sm max-md:hidden w-2xl pt-10 pb-10 p-5 mt-20">
        {message || 'We use the mid-market rate for our Converter. This is for informational purposes only. You won\'t receive this rate when sending money.'}
    </div>
);

export default InfoMessage;
