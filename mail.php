<?php

$recepient = "e.alexandrov177@yandex.ru";
$siteName = "DJkaraoke";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$order = $_POST["order"];
$message = "Имя: $name \nТелефон: $phone \nЗаказ: $order";

$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>
