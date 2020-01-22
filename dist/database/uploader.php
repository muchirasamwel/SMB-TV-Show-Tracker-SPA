<?php

// session_start();
//      if (!isset($_SESSION['username'])) {

//         echo "<script>window.location.replace('../index.php')</script>";
//     } add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, FILE';
//     elseif($_SESSION['user_type']!="Admin"){
//         echo "<script>window.location.replace('../index.php')</script>";
//     }
if (isset($_FILES['image'])) {
    $errors=array();
    $file_name=$_FILES['image']['name'];
    $file_size=$_FILES['image']['size'];
    $file_tmp=$_FILES['image']['tmp_name'];
    $file_type=$_FILES['image']['type'];
    $x=explode('.', $file_name);
    $file_ext=strtolower(end($x));
    $destination="../images/";
    $destination=$destination.$file_name;
    if (empty($errors)==true) {
        move_uploaded_file($file_tmp, $destination);
        $_SESSION['image']=$destination;
        // echo "<script>alert('Upload success');window.location.href='Profile.php';</script>";
        echo ("Upload success");
    }
    else{
        //echo "<script type='text/javascript'>alert('".$errors[0]."');window.location.href='property.php';</script>";
        echo ("upload error ".$errors[0]);
    }
}
else
{
    echo "not set";
}
?>