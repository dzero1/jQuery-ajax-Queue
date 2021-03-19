/**
 * 
 * Author   : Dananjaya M. Perera
 * Email    : dananjaya01@gmail.com
 * Date     : 2021-03-19
 * 
 * License  : Creative Common Zero V1.0
 * 
 */

var _queue = [];
var _currentQueue;

// Main function
/**
 * 
 * @param {string} url - Request endpoint
 * @param {*} data - Request data. Can be string, object or formData.
 * @param {function} callback - The callback function for your next process
 * @param {string} method - HTTP request method (GET, POST, PUT, DELETE, etc..)
 * @param {object} headers - HTTP request headers. Just a key value object
 * @param {bool} addtoQueue - Whether add to queue or just sent as a normal ajax service
 */
function ajaxQueue(url, data, callback=null, method="GET", headers = {}, addtoQueue = true){
    if (addtoQueue){
        _queue.push({url:url, data:data, callback:callback, method:method});
    } else {
        var ajaxcalls = {
            url: url,
            type: method,
            method: method,
            timeout: 0,
            headers: headers,
            data: data,
            success: function(ret){
                try {
                    ret = JSON.parse(ret);
                } catch (error) {
                }
                if (typeof callback === "function") callback(ret);
            },
            error:function(e){
                console.log(e);
                try {
                    if (typeof callback === "function") callback(false, e);
                } catch (error) {
                }
            }
        };
        if (data instanceof FormData){
            ajaxcalls.contentType = false;
            ajaxcalls.processData = false;
            ajaxcalls.mimeType = "multipart/form-data";
            ajaxcalls.cache = false;
        }
        $.ajax(ajaxcalls);
    }
    _processQueue();
}

// Private function to process the queue
function _processQueue(){
    if (_currentQueue == undefined && _queue.length > 0){
        _currentQueue = _queue.shift();
        var url = _currentQueue.url;
        var data = _currentQueue.data;
        var method = _currentQueue.method;
        var callback = _currentQueue.callback;

        console.log("Queue calls:", url, data);
        var ajaxcalls = {
            type: method,
            url: url,
            data: data,
            success: function(ret){
                try {
                    ret = JSON.parse(ret);
                } catch (error) {
                }
                if (typeof callback === "function") callback(ret);
                _currentQueue = undefined;
                _processQueue();
            },
            error:function(e){
                console.log(e);
                _currentQueue = undefined;
                _processQueue();
            }
        };
        $.ajax(ajaxcalls);
    }
}
