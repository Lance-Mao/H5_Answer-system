layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;

    $(function () {
        indexPage.showTK();
    })


    indexPage = {
        showXZ: function () {
            $("#showCountByTK").hide();
            $("#showCountByPD").hide();
            $("#showCountByXZ").show();
            $("#showCountByXZ").html(`<h1 style="text-align: center">选择题</h1>`);
            $.get("../json/xuanzeti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    $("#showCountByXZ").append(`<div class="layui-collapse layui-form" lay-filter="test" style="background-color: #f2f2f2; height: 150px;width: 420px;float:left;margin: 10px 10px">
        <div class="layui-colla-item">
            <h2 class="layui-colla-title">` + data[i].timu + `——答案:`+data[i].zqda+`</h2>
            <ul>
                <li>` + data[i].xuanxiang.A + `</li>
                <li>` + data[i].xuanxiang.B + `</li>
                <li>` + data[i].xuanxiang.C + `</li>
                <li>` + data[i].xuanxiang.D + `</li>
                <li><div class="layui-form layui-form-item" pane="">
                    <div class="layui-input-block XZ_Info">
                        <input type="radio" name="` + data[i].tk + `" value="A" title="A">
                        <input type="radio" name="` + data[i].tk + `" value="B" title="B">
                        <input type="radio" name="` + data[i].tk + `" value="C" title="C">
                        <input type="radio" name="` + data[i].tk + `" value="D" title="D">
                    </div>
                </div></li>
            </ul>
        </div>
    </div>`)
                }
                form.render();
            })

        },

        showPD: function () {
            $("#showCountByTK").hide();
            $("#showCountByXZ").hide();
            $("#showCountByPD").show();
            $("#showCountByPD").html(`<h1 style="text-align: center">判断题</h1>`);
            $.get("../json/panduanti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    $("#showCountByPD").append(`<div class="layui-collapse layui-form" lay-filter="test" style="background-color: #f2f2f2; height: 150px;width: 420px;float: left;margin: 10px 10px">
        <div class="layui-colla-item">
            <h2 class="layui-colla-title">` + data[i].timu + `——答案:`+data[i].result+`</h2>
            <ul style="margin-top: 50px">
                <li><div class="layui-form layui-form-item" pane="">
                    <div class="layui-input-block PD_Info">
                        <input type="radio" name="` + data[i].num + `" value="对" title="对">
                        <input type="radio" name="` + data[i].num + `" value="错" title="错">
                    </div>
                </div></li>
            </ul>
        </div>
    </div>`)
                }
                form.render();
            })
        },

        showTK: function () {

            $("#showCountByTK").show();
            $("#showCountByTK").html(`<h1 style="text-align: center">填空题</h1>`);
            $("#showCountByXZ").hide();
            $("#showCountByPD").hide();
            $.get("../json/tiankongti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    $("#showCountByTK").append(`<div class="layui-collapse layui-form" lay-filter="test" style="background-color: #f2f2f2; height: 150px;width: 420px;float: left;margin: 10px 10px">
                            <div class="layui-colla-item">
                                <h2 class="layui-colla-title">` + data[i].timu + `</h2>
                                <ul style="margin-top: 40px">
                                    <li><div class="layui-form layui-form-item" pane="">
                                        <div class="layui-input-block" style="margin: 10px 10px">
                                            <div class="layui-form-item">
                                                <div class="layui-input-block">
                                                  <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="答案`+data[i].zqda+`" class="layui-input TK_Info">
                                                </div>
                                        </div>
                                    </div></li>
                                </ul>
                            </div>
                        </div>`)
                }
                form.render();
            })

        },
        showAll: function () {
            let pd_score = 0;
            let xz_score = 0;
            let tk_score = 0;

            let resultInfoByTK = [];
            let resultInfoByXZ = [];
            let resultInfoByPD = [];
            let TK_result = $(".TK_Info");
            let XZ_result = $(".XZ_Info");
            let PD_result = $(".PD_Info");
            for (let i = 0; i < TK_result.length; i++) {
                resultInfoByTK.push($(TK_result[i]).val());
            }

            for (let j = 0; j < XZ_result.length; j++) {
                resultInfoByXZ.push($(XZ_result[j]).find("input[type='radio']:checked").val());
            }

            for (let j = 0; j < PD_result.length; j++) {
                resultInfoByPD.push($(PD_result[j]).find("input[type='radio']:checked").val());
            }

            $.get("../json/panduanti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    resultInfoByPD[i] === data[i].result ? pd_score += 10 : pd_score += 0;
                }
                window.sessionStorage.setItem("pd_score",pd_score);
            })

            $.get("../json/tiankongti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    resultInfoByTK[i] === data[i].zqda ? tk_score += 10 : tk_score += 0;
                }
                window.sessionStorage.setItem("tk_score",tk_score);

            })

            $.get("../json/xuanzeti.json", function (data) {
                for (let i = 0; i < data.length; i++) {
                    resultInfoByXZ[i] === data[i].zqda ? xz_score += 10 : xz_score += 0;
                }
                window.sessionStorage.setItem("xz_score",xz_score);
            })

            let allScore = Number(window.sessionStorage.getItem("xz_score")) +
                Number(window.sessionStorage.getItem("tk_score")) +
                Number(window.sessionStorage.getItem("pd_score"));

            $("#showMsg").html("").append(`选择题得分：` + Number(window.sessionStorage.getItem("xz_score")) + `分，填空题得分：` + Number(window.sessionStorage.getItem("tk_score")) + `分，判断题得分：` + Number(window.sessionStorage.getItem("pd_score")) + `分，总分数为：` + allScore + `分。`);
            $("#showMsg").show();
        },
        clear:function () {
            window.location.reload();//刷新当前页面.
        }
    }
});