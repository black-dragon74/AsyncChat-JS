// Code by black.dragon74

// Var declarations, do not change
let c = '.chat';
let cMsgCounter = '.chat-message-counter';
let cHeader = '#live-chat header';
let lCContent = '#live-chat-content';
let lCMessage = '#live-chat-message';
let lCTime = '#live-chat-time';
let lCSubmit = '#live-chat-submit';
const nullChar = '';
let questionID = 1;
let handler = 'http://localhost/AsyncChat-JS/inc-php/handler.php';

// Set to 0 to disable debug logs
const debug = 1;

// Utility functions
// dbgLog Prints debug log
function dbgLog(msg){
    if (debug){
        console.log(msg);
    }
}

// sendAsync sends a XML-HTTP asynchronous request that communicates with back-end and updates the UI.
function sendAsync(questionID, msg, idContent, idTime=lCTime){
    dbgLog('Send Async called');
    $.ajax({
        url: handler,
        data: {
            'asyncValid': 'yes',
            'questionID': questionID,
            'cMessage': msg
        },
        type: 'post',
        success: function (response) {
            let parsedResponse = $.parseJSON(response);
            if (parsedResponse.status !== 'error'){
                $(idContent).html(parsedResponse.cContent);
                $(idTime).html(parsedResponse.cTime);
            }
            else {
                dbgLog(parsedResponse.errorMsg);
                alert(parsedResponse.errorMsg);
            }
        },
        error: function () {
            alert('Server error!');
            dbgLog('Unable to send ajax request.');
        }
    });
}

// Hook to document ready event and handle all the magic
$(document).ready(function () {
    // Propagate the time with current time
    $(lCTime).html(new Date().toLocaleTimeString(
        'en-US',
        {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }
    ));

    // Handle chat header clicks
    $(cHeader).on('click', function () {
        $(c).slideToggle(300, 'swing'); // Show/Hide the chat box
        $(cMsgCounter).fadeToggle(300, 'swing'); // Show/Hide the unread badges
    });

    // Propagate the question, 1st Async call is automatic and is called onLoad
    sendAsync(questionID, 'dummy', lCContent);

    // Handle the form submissions using AJAX
    $(lCSubmit).on('click', function (e) {
        e.preventDefault(); // We now have the control of the data
        let msg = $.trim($(lCMessage).val());

        // Prevent empty submissions
        if (msg === nullChar){
            alert('Empty submissions not allowed');
            // Die
            return;
        }

        // Handle submissions via AJAX, recheck for null, prevent possible XSS
        if (msg !== nullChar){
            dbgLog('Preparing AJAX submission with response: '+msg);
            sendAsync(++questionID, msg, lCContent);
            // After this, update the text box
            $(lCMessage).val(nullChar);
            $(lCMessage).focus();
        }
    });
});