# jQuery-ajax-Queue
Queue for jQuery ajax


You can get the ajaxQueue.js file and load it after jQuery.

Main function to use - ajaxQueue

Parameters
----------

- {string} url - Request endpoint
- {*} data - Request data. Can be string, object or formData.
- {function} callback - The callback function for your next process
- {string} method - HTTP request method (GET, POST, PUT, DELETE, etc..)
- {object} headers - HTTP request headers. Just a key value object
- {bool} addtoQueue - Whether add to queue or just sent as a normal ajax service
