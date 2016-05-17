<?php
include "conn.php";
ini_set("display_errors", "Off");
error_reporting(E_ALL | E_STRICT);
$data=array();
$data['code']='x';
$name=$_GET['name'];
$phonenumber=$_GET['phonenumber'];
$zbj=$_GET['zbj'];
$qs=$_GET['qs'];
$temp=$_GET['qlx'];
switch ($temp) {
	case '0':
		$qlx="15天";
		break;
	case '1':
		$qlx="3个月";
		break;
	case '2':
		$qlx="6个月";
		break;
	case '3':
		$qlx="12个月";
		break;					
	default:
		# code...
		break;
}
$qsxf=$_GET['qsxf'];
$qlv=$_GET['qlv'];
$mqyhb=$_GET['mqyhb'];
$mqyhz=$_GET['mqyhz'];
$date = date("Y-m-d");
$time = date("H:i:s");
if($q=$link->query("INSERT INTO dorder VALUES('','$name','$phonenumber','$zbj','$qs','$qlx','$qsxf','$qlv','$mqyhb','$mqyhz','$date','$time')")){
	$data['code']='0';
}else{
	$data['code']='1';
}
if($q2=$link->query("SELECT last_insert_id() AS id")){
	$data['code']='0';
}else{
	$data['code']='2';
}
$r2=$q2->fetch_row();
$bianhao=$r2[0];
$data['id']=$bianhao;
$link->close();
echo json_encode($data);
require_once "mailer.php";
$smtpserver = "xxxxxxxxxxxxxxxxx";
//SMTP服务器
$smtpserverport = 25;
//SMTP服务器端口
$smtpusermail = "xxxxxxxxxxx";
//SMTP服务器的用户邮箱
$smtpuser = "xxxxxxxxxxxxxxxx";
//SMTP服务器的用户帐号
$smtppass = "xxxxxxxxxxxxxxxx";
//SMTP服务器的用户密码
$smtpemailto = "xxxxxxxxxxxxxxxxxx";
	//发送给谁
$mailtitle = '【优生贷款】新贷款请求';
	//邮件主题
	$mailcontent ="收到编号为：".$bianhao."姓名：".$name."手机号为：" . $phonenumber ."贷款额：".$zbj."共".$qs."期"."期类型".$qlx."每期应还总金额".$mqyhz."的新订单，请尽快处理！";
	//邮件内容
	$mailtype = "HTML";
	//邮件格式（HTML/TXT）,TXT为文本邮件
	//************************ 配置信息 ****************************
	$smtp = new smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass);
	//这里面的一个true是表示使用身份验证,否则不使用身份验证.
	$smtp -> debug = false;
	//是否显示发送的调试信息
	$state = $smtp -> sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);


?>