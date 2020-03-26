(function($) {
  function init() {
    $(".box1").addClass("show");
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
