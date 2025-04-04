export function DisplayDifference(data, localData) {
  if (!data || !localData) return null;

  const difference = parseFloat(data) - parseFloat(localData);

  if (difference > 0) {
    return <span className="text-green-500">+{difference.toFixed(1)}</span>;
  } else if (difference === 0) {
    return <span className="text-orange-500">+{difference.toFixed(1)}</span>;
  } else {
    return <span className="text-red-500">{difference.toFixed(1)}</span>;
  }
}
