export function DisplayDifference(data, localData, isRank) {
  if (!data || !localData) return null;

  let difference = parseFloat(data) - parseFloat(localData);

  if (difference === null) {
    difference = 0;
  }

  if (isRank) {
    if (difference > 0) {
      return <span className="text-red-500">+{difference.toFixed(1)}</span>;
    } else if (difference < 0) {
      return <span className="text-green-500">{difference.toFixed(1)}</span>;
    } else {
      return null;
    }
  } else {
    if (difference > 0) {
      return <span className="text-green-500">+{difference.toFixed(1)}</span>;
    } else if (difference < 0) {
      return <span className="text-red-500">{difference.toFixed(1)}</span>;
    } else {
      return null;
    }
  }
}
