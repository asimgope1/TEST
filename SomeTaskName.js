// SomeTaskName.js

module.exports = async (taskData) => {
    console.log('Headless JS task called'); // This should show in the logs
  
    // Your task logic
    try {
      // Perform any task, like fetching location
      console.log('Task data:', taskData);
      // You can add additional logic or API calls here.
    } catch (error) {
      console.error('Error in headless task:', error);
    }
  };
  