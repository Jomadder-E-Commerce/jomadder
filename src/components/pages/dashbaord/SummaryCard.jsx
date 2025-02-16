const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default SummaryCard;
