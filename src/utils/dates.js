// Get date
export function getDate() {
  return new Date().getTime();
}

// Check if the date has been more than 24 hours
export function hasBeenMoreThan24Hours(previousDate, currentDate) {
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
  return currentDate - previousDate >= twentyFourHoursInMs;
}

//Format the date
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
