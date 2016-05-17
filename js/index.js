$(document).ready(function() {
    var status = new Object();
    status.code = false;
    (function() {
        var s= new Object();
        var data = window.location.search;
        if (data.length <= 1) {
        }
        data = data.slice(1, data.length);
        var a = data.split("&");
        var len1 = a.length;
        for (var i = 0; i < len1; i++) {
            var b = a[i].split("=");
            var key = b[0];
            var value = b[1];
            s[key] = value;
        }
        $("#jine").val(s.zbj);
        $(".qishu select option:eq("+s.qlx+")").attr('selected', '');;
        var jine = parseFloat($("#jine").val());
        if (jine < 1000 || jine > 10000 || isNaN(jine)) {
            $(".meiqi").text("");
            $(".fukuan").text("");
            $(".fukuanzonge").text("");
            status.code = false;
        } else {
            figur();
        }
    })();
    function attention() {
        $("#jine,.top span").css('borderColor', 'red');
        status.code = false;
    }

    function figur() {
        var val = $(".qishu select").val();
        var jine = $("#jine").val();
        switch (val) {
            case '0':
                $(".lilv").text("0");
                $(".shouxufei").text("5%/期");
                var shouxufei = (jine * 0.04).toFixed(2);
                var zonge = (parseFloat(jine) + parseFloat(shouxufei)).toFixed(2);
                $(".meiqi").text("每期应付");
                $(".fukuan").text("本金:" + jine + "+手续费:" + shouxufei);
                $(".fukuanzonge").text("=" + zonge + "元");
                status.code = true;
                status.zbj = jine;
                status.qs = 1;
                status.qlx = 0;
                status.qsxf = shouxufei;
                status.qlv = 0;
                status.mqyhb = jine;
                status.mqyhz = zonge;
                break;
            case '1':
                $(".lilv").text("5%/月");
                $(".shouxufei").text("0");
                var lixi = (jine * 0.05).toFixed(2);
                var benjin = (parseFloat(jine) / 3).toFixed(2);
                var zonge = (parseFloat(benjin) + parseFloat(lixi)).toFixed(2);
                $(".meiqi").text("每月应付");
                $(".fukuan").text("本金:" + benjin + "+利息:" + lixi);
                $(".fukuanzonge").text("=" + zonge + "元");
                status.code = true;
                status.zbj = jine;
                status.qs = 3;
                status.qlx = 1;
                status.qsxf = 0;
                status.qlv = lixi;
                status.mqyhb = benjin;
                status.mqyhz = zonge;
                break;
            case '2':
                $(".lilv").text("5%/月");
                $(".shouxufei").text("0");
                var lixi = (jine * 0.05).toFixed(2);
                var benjin = (parseFloat(jine) / 6).toFixed(2);
                var zonge = (parseFloat(benjin) + parseFloat(lixi)).toFixed(2);
                $(".meiqi").text("每月应付");
                $(".fukuan").text("本金:" + benjin + "+利息:" + lixi);
                $(".fukuanzonge").text("=" + zonge + "元");
                status.code = true;
                status.zbj = jine;
                status.qs = 6;
                status.qlx = 2;
                status.qsxf = 0;
                status.qlv = lixi;
                status.mqyhb = benjin;
                status.mqyhz = zonge;
                break;
            case '3':
                $(".lilv").text("5%/月");
                $(".shouxufei").text("0");
                var lixi = (jine * 0.05).toFixed(2);
                var benjin = (parseFloat(jine) / 12).toFixed(2);
                var zonge = (parseFloat(benjin) + parseFloat(lixi)).toFixed(2);
                $(".meiqi").text("每月应付");
                $(".fukuan").text("本金:" + benjin + "+利息:" + lixi);
                $(".fukuanzonge").text("=" + zonge + "元");
                status.code = true;
                status.zbj = jine;
                status.qs = 12;
                status.qlx = 3;
                status.qsxf = 0;
                status.qlv = lixi;
                status.mqyhb = benjin;
                status.mqyhz = zonge;
                break;
            default:
                break;
        }
    }
    $("#jine").focus(function() {
        $("#jine,.top span").css('borderColor', 'white');
        status.code = true;
    });
    $("#jine").keyup(function() {
        var jine = parseFloat($(this).val());
        if (jine < 1000 || jine > 10000 || isNaN(jine)) {
            $(".meiqi").text("");
            $(".fukuan").text("");
            $(".fukuanzonge").text("");
            status.code = false;
        } else {
            figur();
        }
    });
    $("#jine").blur(function() {
        var jine = parseFloat($(this).val());
        if (jine < 1000 || jine > 10000 || isNaN(jine)) {
            attention();
        }
    });
    $(".qishu select").change(function() {
        if (!$("#jine").val()) {
            attention();
        } else {
            figur();
        }
    });
    $(".button").click(function() {
        if (status.code) {
            var a = new Date();
            status.time = a.getTime();
            var data = "";
            for (var key in status) {
                if (key == "code") {} else {
                    data += key + "=" + status[key] + "&";
                }
            }
            var urlData = data.slice(0, data.length - 1);
            window.location.href = "information.html?" + urlData;
        }
    });
});
