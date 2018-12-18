<!doctype html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>AsyncChat-JS by Nick</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700">
    <link rel="stylesheet" href="css/style.css">

</head>
<body>

<div id="live-chat">

    <header class="clearfix">
        <h4>Customer Feedback Bot</h4>

        <span class="chat-message-counter">1</span>
    </header>

    <div class="chat">
        <div class="chat-history">
            <div class="chat-message clearfix">
                <img src="img/bot.png" alt="" width="32" height="32">

                <div class="chat-message-content clearfix">
                    <span class="chat-time" id="live-chat-time">13:35</span>

                    <h5>Feed Bot</h5>

                    <p id="live-chat-content">I you see me, well you're doomed as your server is not working.</p>
                </div>
            </div>
            <hr>
        </div>

        <form action="#" method="post">
            <fieldset>
                <input type="text" placeholder="Type your message…" id="live-chat-message" autofocus required>
                <input type="submit" class="btn btn-submit" id="live-chat-submit" value="Send">
            </fieldset>
        </form>
    </div>
</div>
<script src="js/jquery.js"></script>
<script src="js/app.js"></script>
</body>
</html>