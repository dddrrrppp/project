<?php
	$tel = $_GET['tel'];
    $coon = new mysqli("localhost", "root", "", "shop", "3306");

    $sql = "select * from user where tel = '$tel'";
    $result = $coon -> query($sql);
    $rows = $result -> fetch_assoc();
    if($rows) {
        // 账号已存在
        $arr = array("msg" => 101);
    } else {
        $arr = array("msg" => 200);
    }
    echo json_encode($arr);
	
	
	
?>