<?php

$field_name = $_POST['name'];
$field_email = $_POST['email'];
$field_message = $_POST['message'];

$mail_to = 'example@example.com';

$subject = 'Message from a site visitor ' . $field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Message: '.$field_message;

$headers = "From: email\r\n";
$headers .= "Reply-To: email\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { 

} else { ?>
	
    <script language="javascript" type="text/javascript">
        alert('Failed');
    </script>

<?php
} ?>