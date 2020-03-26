(function($) {
  function init() {
    var myChart = echarts.init(document.getElementById("main"));
    var option = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);





    var myChart1 = echarts.init(document.getElementById("main1"));

    var data = genData(50);

    option1 = {
      title: {
        text: "同名数量统计",
        subtext: "纯属虚构",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,

        selected: data.selected
      },
      series: [
        {
          name: "姓名",
          type: "pie",
          radius: "55%",
          center: ["40%", "50%"],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    function genData(count) {
      var nameList = [
        "赵",
        "钱",
        "孙",
        "李",
        "周",
        "吴",
        "郑",
        "王",
        "冯",
        "陈",
        "褚",
        "卫",
        "蒋",
        "沈",
        "韩",
        "杨",
        "朱",
        "秦",
        "尤",
        "许",
        "何",
        "吕",
        "施",
        "张",
        "孔",
        "曹",
        "严",
        "华",
        "金",
        "魏",
        "陶",
        "姜",
        "戚",
        "谢",
        "邹",
        "喻",
        "柏",
        "水",
        "窦",
        "章",
        "云",
        "苏",
        "潘",
        "葛",
        "奚",
        "范",
        "彭",
        "郎",
        "鲁",
        "韦",
        "昌",
        "马",
        "苗",
        "凤",
        "花",
        "方",
        "俞",
        "任",
        "袁",
        "柳",
        "酆",
        "鲍",
        "史",
        "唐",
        "费",
        "廉",
        "岑",
        "薛",
        "雷",
        "贺",
        "倪",
        "汤",
        "滕",
        "殷",
        "罗",
        "毕",
        "郝",
        "邬",
        "安",
        "常",
        "乐",
        "于",
        "时",
        "傅",
        "皮",
        "卞",
        "齐",
        "康",
        "伍",
        "余",
        "元",
        "卜",
        "顾",
        "孟",
        "平",
        "黄",
        "和",
        "穆",
        "萧",
        "尹",
        "姚",
        "邵",
        "湛",
        "汪",
        "祁",
        "毛",
        "禹",
        "狄",
        "米",
        "贝",
        "明",
        "臧",
        "计",
        "伏",
        "成",
        "戴",
        "谈",
        "宋",
        "茅",
        "庞",
        "熊",
        "纪",
        "舒",
        "屈",
        "项",
        "祝",
        "董",
        "梁",
        "杜",
        "阮",
        "蓝",
        "闵",
        "席",
        "季",
        "麻",
        "强",
        "贾",
        "路",
        "娄",
        "危"
      ];
      var legendData = [];
      var seriesData = [];
      var selected = {};
      for (var i = 0; i < count; i++) {
        name =
          Math.random() > 0.65
            ? makeWord(4, 1) + "·" + makeWord(3, 0)
            : makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
          name: name,
          value: Math.round(Math.random() * 100000)
        });
        selected[name] = i < 6;
      }

      return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
      };

      function makeWord(max, min) {
        var nameLen = Math.ceil(Math.random() * max + min);
        var name = [];
        for (var i = 0; i < nameLen; i++) {
          name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join("");
      }
    }

    myChart1.setOption(option1);

    $(".box2").addClass("show");
    myAjax("../student.json", "get", "", function(res) {
      var arr = res;
      for (var i = 0; i < arr.length; i++) {
        $(
          "<tr><td>" +
            arr[i].id +
            "</td><td>" +
            arr[i].name +
            "</td><td>" +
            arr[i].age +
            "</td><td>" +
            (arr[i].sex == 0 ? "男" : "女") +
            "</td><td>" +
            arr[i].email +
            "</td><td>" +
            arr[i].class +
            "</td><td>" +
            arr[i].address +
            "</td><td>" +
            arr[i].score +
            "</td><td><button type='button' data-index=" +
            arr[i].id +
            " class='edit_btn layui-btn layui-btn-xs'>编辑</button><button data-index=" +
            arr[i].id +
            " class='del_btn layui-btn layui-btn-xs layui-btn-danger'>删除</button></td></tr>"
        ).appendTo(".student_list");
      }
    });
    bindEvent();
  }

  // 获取数据
  function getData(data) {
    $.ajax({
      type: "POST",
      url: "http://openapi.tuling123.com/openapi/api/v2",
      data: {
        reqType: 0,
        perception: {
          inputText: {
            text: data
          },
          selfInfo: {
            location: {
              city: "漳州",
              province: "福建",
              street: "通北街道"
            }
          }
        },
        userInfo: {
          apiKey: "cc3bf4e5c12d42f1905c679ee3de5b07",
          userId: "shi1505"
        }
      },
      dataType: "json",
      success: function(res) {
        // 渲染数据
        var text = res.results[0].values.text;
        renderDom("robot", text);
      }
    });
  }
  // 渲染数据
  function renderDom(who, text) {
    // 创建自己的信息
    if (who == "mine") {
      $(
        '<div class="mine">\
      <div class="avatar"></div>\
      <div class="text">' +
          text +
          "</div>\
      </div>"
      ).appendTo($(".content"));
      // 创建机器人信息
    } else if (who == "robot") {
      $(
        '<div class="robot">\
      <div class="avatar"></div>\
      <div class="text">' +
          text +
          "</div>\
      </div>"
      ).appendTo($(".content"));
    }
    // 计算滚动条
    var scrollTop = $(".content")[0].scrollHeight - $(".content").height();
    $(".content").scrollTop(scrollTop);
  }

  // 绑定事件
  function bindEvent() {
    $(".left_menu li").on("click", function(e) {
      var index = $(this).index();
      changeMenu(index);
    });
    $(".layui-nav-child dd").on("click", function(e) {
      var index = $(this).index();
      index === 0 ? changeMenu(6) : changeMenu(7);
    });

    // 把发送按钮绑定点击事件
    $(".sub-input").on("click", function(e) {
      // 获取发送信息
      var text = $(".text-input").val();
      // 判断信息是否为空
      if (text != "") {
        // 渲染数据
        renderDom("mine", text);
        // 获取数据
        getData(text);
        // 清空信息
        $(".text-input").val("");
      } else if (text == "") {
        alert("请输入信息！");
      }
    });
    // 绑定键盘事件
    $(".text-input").on("keypress", function(e) {
      // 兼容
      e = window.event || event;
      // 判断是否为回车
      if (e.keyCode == 13) {
        $(".sub-input").trigger("click");
      }
    });
  }

  function changeMenu(index) {
    var arr = $(".content_box").children();
    for (var i = 0; i < arr.length; i++) {
      $(arr[i]).removeClass("show");
    }
    $(".box" + index).addClass("show");
    if (index === 0) {
      console.log(11);
      myAjax("../student.json", "get", "", function(res) {
        console.log(res);
      });
    }

    var arr1 = $(".left_menu").children();
    for (var i = 0; i < arr1.length; i++) {
      $(arr1[i]).removeClass("layui-this");
    }
    $(".left_menu")
      .children()
      .eq(index)
      .addClass("layui-this");
  }

  function myAjax(url, method, data, func) {
    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function(res) {
        func(res);
      }
    });
  }

  init();
})($);
