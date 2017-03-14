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
          var pref_alert = '';
          var address_alert = '';
          $.each(obj.reverse(), function(index, val){
            if (-1 != jQuery.inArray('administrative_area_level_1', val['types'])) {
              pref_alert = val['long_name'];
            }
            if (-1 != jQuery.inArray('locality', val['types'])) {
              address_alert += val['long_name'];
            }
          });
          if (pref_alert) {
            //$('#pref_alert').text(pref_alert); // 都道府県
          }
          if (address_alert) {
            $('#address').val(address_alert);
          }
        }
      }
    });
  });

});
