// Code by black.dragon74

// Var declarations, do not change
let c = '.chat';
let cMsgCounter = '.chat-message-counter';
let cHeader = '#live-chat header';
let lc = '#live-chat';
let lCContent = '#live-chat-content';
let lCMessage = '#live-chat-message';
let lCTime = '#live-chat-time';
let lCSubmit = '#live-chat-submit';
let lCSubmitHover = '#live-chat-submit:hover';
const nullChar = '';
let questionID = 1;
let handler = 'http://localhost/AsyncChat-JS/inc-php/handler.php';
let UUID = ''; // Is propagated by call to genRandomUID

// Function definitions
const fetchQuestion = 'fetchQuestion';
const fetchAndStore = 'fetchAndStore';

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
function sendAsync(uid = UUID, questionID, msg, idContent, idTime=lCTime, functionToCall){
    dbgLog('Send Async called');
    $.ajax({
        url: handler,
        data: {
            'asyncValid': 'yes',
            'uid' : uid,
            'questionID': questionID,
            'cMessage': msg,
            'functionToCall': functionToCall
        },
        type: 'post',
        success: function (response) {
            let parsedResponse = $.parseJSON(response);
            if (parsedResponse.status !== 'error'){
                $(idContent).html(parsedResponse.cContent);
                $(idTime).html(parsedResponse.cTime);
            }
            else {
                // We will get a stues == error and errorMsg if now matching rows are found with the question ID
                // In that case either the qid is invalid or the questions have ended.
                dbgLog(parsedResponse.errorMsg);

                // Say thanks
                $(lCContent).html('Thank you for your time! This dialog will auto close now.');

                // Disable send button
                $(lCSubmit).prop('disabled', true);
                $(lCSubmitHover).css({
                    'cursor': 'not-allowed',
                    'background': 'unset'
                });

                // Remove the chat box
                setTimeout(function () {
                    $(lc).fadeOut();
                }, 2000);
            }
        },
        error: function () {
            alert('Server error!');
            dbgLog('Unable to send ajax request.');
        }
    });
}

function genRandomUID(){
    return Math.random().toString(36).substr(2, 8);
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

    // Propagate the UUID
    UUID = genRandomUID();

    // Handle chat header clicks
    $(cHeader).on('click', function () {
        $(c).slideToggle(300, 'swing'); // Show/Hide the chat box
        $(cMsgCounter).fadeToggle(300, 'swing'); // Show/Hide the unread badges
    });

    // Propagate the question, 1st Async call is automatic and is called onLoad with dummy content
    sendAsync(undefined, questionID, 'dummy', lCContent, undefined, fetchQuestion);

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
            sendAsync(undefined, ++questionID, msg, lCContent, undefined, fetchAndStore);
            // After this, update the text box
            $(lCMessage).val(nullChar);
            $(lCMessage).focus();
        }
    });
});