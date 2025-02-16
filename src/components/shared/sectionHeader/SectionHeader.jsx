

const SectionHeader = ({ text }) => {
    return (
        <div className="flex flex-col items-center mb-2 md:mb-5">
            {/* Header Text */}
            <h1 className="relative mb-2 md:text-xl sm:text-base text-sm font-bold text-center text-primary">{text}</h1>

            <div className="header"></div>
        </div>
    );
};


export default SectionHeader;