<?php
    // 引入其他文件
    include 'connect.php';

    // 编写查询sql语句
    $sql = 'select * from indexdata where id between 1 and 5';


    // 利用sql语句查询数据库
    // 查询结果集
    $result = $conn->query($sql);


    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);



    echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>