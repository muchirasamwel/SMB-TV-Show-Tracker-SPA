<?php
function mailthis($to, $subject, $message)
{
    require 'PHPMailer-5.2-stable/PHPMailerAutoload.php';
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPKeepAlive = true;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPDebug = 4;
    $mail->Username = 'teabagtastes@gmail.com';
    //$mail->Password = '33164791';
    $mail->Password = 'teabagtastes@1';
    $mail->setFrom('admin@smbtvshows.com', "SMB TV SHOWS");
    //$mail->addAddress('samkan.sk1.sm@gmail.com');
    $mail->addAddress($to);
    //$mail->addAddress('254714730819@txt.att.net');
    $mail->Subject = $subject;
    $mail->Body = $message;
    //send the message, check for errors
    if (!$mail->send()) {
        return "error: " . $mail->ErrorInfo;
    } else {
        return "success";
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);

if (isset($_POST['mails']) && !is_null($_POST['mails'])) {
    $mails = $_POST['mails'];
    $errors='';
    foreach ($mails as $email) {
        $data = mailthis($email, $_POST['subject'], $_POST['message']);

        if(!contains('success',$data)){
            $errors .= $email." send Failed";
        }
    }
    if($errors)
    {
        echo $errors;
    }
    else
        echo "Mails Sent Successfully";
} else {
    echo mailthis("samkan.sk1.sm@gmail.com", "testing", "Well i have the message then");
}
function contains($needle, $haystack)
{
    return strpos($haystack, $needle) !== false;
}
?>