let x; // Declare the interval globally so we can clear it when needed

document.getElementById('setTimer').addEventListener('click', function() {
  clearInterval(x); // Clear any previous countdown

  const endDateTimeInput = document.getElementById('endDateTime').value;
  const endDate = new Date(endDateTimeInput).getTime();
  const startDate = new Date().getTime();

  if (!endDateTimeInput) {
    alert("Please enter a valid date and time.");
    return;
  }

  x = setInterval(function updateTimer() {
    const now = new Date().getTime();
    const distanceCovered = now - startDate;
    const distancePending = endDate - now;

    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const oneHourInMillis = 60 * 60 * 1000;
    const oneMinInMillis = 60 * 1000;
    const oneSecondInMillis = 1000;

    const days = Math.floor(distancePending / oneDayInMillis);
    const hrs = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);
    const mins = Math.floor((distancePending % oneHourInMillis) / oneMinInMillis);
    const secs = Math.floor((distancePending % oneMinInMillis) / oneSecondInMillis);

    // Populate in UI
    document.getElementById("Days").innerHTML = days;
    document.getElementById("Hrs").innerHTML = hrs;
    document.getElementById("Min").innerHTML = mins;
    document.getElementById("seconds").innerHTML = secs;

    const totalDistance = endDate - startDate;
    const percentageDistance = (distanceCovered / totalDistance) * 100;
    document.getElementById("progress-bar").style.width = percentageDistance + "%";

    if (distancePending < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "The date and Time is EXPIRED";
      document.getElementById("progress-bar").style.width = "100%";
      alert("Time is up!");
    }
  }, 1000);
});
