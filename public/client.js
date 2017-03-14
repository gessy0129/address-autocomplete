// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $('#address').on('blur', function(){
    var address = $(this).val();
    var pref    = $('select[name="school_type"]').val();


    $.ajax({
      type : 'get',
      url : 'https://maps.googleapis.com/maps/api/geocode/json',
      crossDomain : true,
      dataType : 'json',
      data : {
        address : pref + address,
        language : 'ja',
        sensor : false
      },
      success : function(resp){
        if(resp.status == "OK"){
          // APIのレスポンスから住所情報を取得
          var obj = resp.results[0].address_components;
          var new_pref    = '';
          var new_address = '';
          $.each(obj.reverse(), function(index, val){
            if (-1 != jQuery.inArray('administrative_area_level_1', val['types'])) {
              new_pref = val['long_name'];
            }
            if (-1 != jQuery.inArray('locality', val['types'])) {
              new_address += val['long_name'];
            }
          });
          if (new_pref) {
            //$('#pref').text(new_pref); // 今はなし
          }
          if (new_address) {
            $('#address').val(new_address);
          }
        }
      }
    });
  });

});
