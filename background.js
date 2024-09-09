// background.js

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'userAlarm') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'logo.png',
        title: 'Alarm Triggered',
        message: 'Your alarm has gone off!'
      });
    }
  });
  
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setAlarm') {
      const delayInMinutes = message.minutes;
      
      chrome.storage.local.set({ alarmTime: Date.now() + delayInMinutes * 60000 }, () => {
        chrome.alarms.create('userAlarm', { delayInMinutes: delayInMinutes });
        sendResponse({ status: `Alarm set for ${delayInMinutes} minutes.` });
      });
      return true; 
    } else if (message.action === 'getAlarmTime') {
      chrome.storage.local.get('alarmTime', (data) => {
        sendResponse(data);
      });
      return true; 
        }
  });
  