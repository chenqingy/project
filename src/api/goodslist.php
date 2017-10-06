<?php
    include 'connect.php';
    
    $type = isset($_GET['type']) ? $_GET['type'] : '';

    $sql = 'select * from goodslist where type='.$type;


    // 获取查询结果
    $result = $conn->query($sql);

    // 使用查询结果集
    // $row = $result->fetch_assoc();//获取一个
    $row = $result->fetch_all(MYSQLI_ASSOC);//获取多个
    
    //释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>