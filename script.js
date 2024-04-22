function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.getElementById('tracker-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const lastPeriodDate = document.getElementById('last-period-date').value;
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    
    // Calculate next period start date
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    
    // Display tracker information
    const trackerInfo = document.getElementById('tracker-info');
    trackerInfo.innerHTML = `
      <h3>Tracker Information</h3>
      <p>Last Period Start Date: ${lastPeriodDate}</p>
      <p>Average Cycle Length: ${cycleLength} days</p>
      <p>Predicted Next Period Start Date: ${nextPeriodDate.toDateString()}</p>
    `;
  });