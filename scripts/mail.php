<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$mailheader = "From:".$name."<".$email.">\r\n";

$recipient = "info@invictusathletics.ca";

mail($recipient, $subject, $message, $mailheader) or die("Error!");

echo'

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank-you For Contacting Us</title>
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body style="overflow-x: hidden">
    <div class="container">
      <h1
        class="large-writing"
        style="color: white; text-align: center; padding: 0">
        Thank you for contacting Invictus. We will get back to you as soon as
        possible!
      </h1>
      <div class="name-logo-cont" style="width: 100%">
        <a href="../index.html">
          <img
            class="name-logo"
            src="../imgs/name-logo.png"
            alt="Logo for Invictus"
        /></a>
      </div>
      <p class="back" style="color: white; text-align: center">
        Click the image to return to the homepage
      </p>
    </div>
  </body>
</html>




';


?>