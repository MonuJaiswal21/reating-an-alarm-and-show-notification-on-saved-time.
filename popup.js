// popup.js

document.getElementById('setAlarm').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value, 10);
  
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid number of minutes.');
      return;
    }
  
    chrome.runtime.sendMessage({ action: 'setAlarm', minutes: minutes }, (response) => {
      console.log(response.status);
      alert(response.status);
    });
  });
  
  // Optional: Display the saved alarm time on popup open
  window.addEventListener('load', () => {
    chrome.runtime.sendMessage({ action: 'getAlarmTime' }, (response) => {
      if (response.alarmTime) {
        const alarmTime = new Date(parseInt(response.alarmTime, 10));
        document.getElementById('savedTime').textContent = `Next alarm is set for: ${alarmTime.toLocaleTimeString()}`;
      } else {
        document.getElementById('savedTime').textContent = 'No alarm set.';
      }
    });
  });
  