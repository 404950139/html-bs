(function($) {
  function init() {
    bindEvent();
  }

  // 绑定事件
  function bindEvent() {
    var _self = this;
    $(".register_btn").on("click", function() {
      var formData = $(".form_data").serializeArray();
      console.log(formData);
      var data = {
        user: formData[0].value,
        psw: formData[1].value
      };
      console.log(data);
      myAjax(data);
    });
  }

  function myAjax(data) {
    $.ajax({
      url: "/register",
      method: "post",
      data: data,
      success: function(res) {
        console.log(res);
      }
    });
  }

  init();
})($);
