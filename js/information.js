$(document).ready(function() {
    var status = new Object();
    var data = window.location.search;
    if (data.length <= 1) {
        window.location.href = "index.html";
    }
    data = data.slice(1, data.length);
    var a = data.split("&");
    var len1 = a.length;
    for (var i = 0; i < len1; i++) {
        var b = a[i].split("=");
        var key = b[0];
        var value = b[1];
        status[key] = value;
    }
    $(".status li:nth-child(2)").text(status.zbj);
    $(".status li:nth-child(4)").text(status.qs);
    var shichang;
    switch (status.qlx) {
        case '0':
            shichang = "15天";
            break;
        case '1':
            shichang = "3个月";
            break;
        case '2':
            shichang = "6个月";
            break;
        case '3':
            shichang = "12个月";
            break;
        default:
            break;
    }
    $(".status li:nth-child(6)").text(shichang);
    $(".status li:nth-child(8)").text(status.qsxf);
    $(".status li:nth-child(10)").text(status.qlv);
    $(".status li:nth-child(12)").text(status.mqyhb);
    $(".status li:nth-child(14)").text(status.mqyhz);

    $(".header span").click(function() {
        window.location.href = "index.html?" + data;
    });
    $("input").focus(function() {
        $(this).css('borderColor', '#eee');
    });
    $(".button").click(function() {
        if (!$("#name").val()) {
            $("#name").css('borderColor', 'red');
        } else if (!(/^1[0-9]{10}/.test($("#phonenumber").val()))) {
            $("#phonenumber").css('borderColor', 'red');
        }else{
        	status.name=$("#name").val();
        	status.phonenumber=$("#phonenumber").val();
        	$.ajax({
        		"url": 'php/index.php',
        		"type": 'get',
        		"dataType": 'json',
        		"data": status,
        		"success":function(data){
        			if(data.code=='0'){
        				$(".content").html("<div class='ok'>提交成功，编号为:"+data.id+"，稍后会有管理员联系您！</div>");
        			}else{
        				$(".content").html("<div class='ok>提交失败。</div>");
        				console.log(data.code);
        			}
        		}
        	})
        }
    });
    $("#phonenumber").keydown(function(event) {
        if (event.keyCode == 13) {
            $(".button").click();
        }
    });
});
