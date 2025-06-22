<?php

// 確認是否有上傳檔案
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    // 取得上傳檔案的資訊
    $fileName = $_FILES['attachment']['name'];
    $fileTmpPath = $_FILES['attachment']['tmp_name'];
    $uploadDir = __DIR__ . '/uploads/'; // 儲存目錄

    // 確保目錄存在
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // 設定儲存檔案的完整路徑
    $destination = $uploadDir . basename($fileName);

    // 移動檔案到目標目錄
    if (move_uploaded_file($fileTmpPath, $destination)) {
        echo '<h1>已收到您的圖片 ' . htmlspecialchars($fileName, ENT_QUOTES, 'UTF-8') . ', bye!!</h1>';
        echo '<img src="uploads/' . htmlspecialchars($fileName, ENT_QUOTES, 'UTF-8') . '" alt="上傳的圖片">';
    } else {
        echo '<h1>檔案上傳失敗，請重試。</h1>';
    }
} else {
    echo '<h1>未收到檔案或上傳發生錯誤。</h1>';
}