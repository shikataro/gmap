  /*
  gmapOpen();�@���X�܈ꗗ�̏ꍇ
  gmapOpen( �g�嗦(���E�n�} 0-12 �Ŋg��),�i���S���W�ɂ���X�� �����L�Q�Ɓj );
   �� gmapOpen(15,2); �� 15�̊g�嗦�ŁA2 �̓X�܂𒆐S�ɕ\��
   
    0 ���X
    1 ���X
    2 ��O��X
    3 �^���H�ƒc�n�X
    4 �גJ�X
    5 �ʐ��X
    6 �{�̓��X
    7 �I�[�g�e���X�F�s�{��
  */
function gmapOpen (zm, ce){
  google.maps.event.addDomListener(window, 'load', function(){
    var mapId = 'gmap'; // gmap�\���ӏ���ID
    var cLat  = 36.464699; // �X�܂��ݒ肳��Ă��Ȃ��Ƃ��̒��S�ܓx
    var cLng  = 139.8983; // �X�܂��ݒ肳��Ă��Ȃ��Ƃ��̒��S�o�x
    var cZoom = 10; // �X�܂��ݒ肳��Ă��Ȃ��Ƃ��̊g�嗦
    var wZoom = 12; // icon���N���b�N���ꂽ�Ƃ��̊g�嗦
    var iconImg      = "";
    // var iconImg = "img/red-dot.png";
    var iconSize     = new google.maps.Size(32, 32);
    var iconPosition = new google.maps.Point(0, 0);
    var iconOffset   = new google.maps.Point(16, 16);
      var iconOffset___ShopName___ = new google.maps.Point(0, 0);

    // map�̕\���`����ݒ�
    var shop = [
      { // 0
          name: "���X",
           zip: "323-0829",
          addr: "�Ȗ،����R�s�����1-3-13",
           tel: "0285-27-1331",
           lat: "36.298725",
           lng: "139.813502",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "046_sr_jonan.html",
        target: "_self"
      },
      { // 1
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 2
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 3
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 4
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 5
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 6
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      },
      { // 7
          name: "",
           zip: "",
          addr: "",
           tel: "",
           lat: "",
           lng: "",
        marker: iconImg,
         mkrSz: iconSize,
        mkrPos: iconPosition,
         mkrOf: iconOffset,
          href: "",
        target: "_self"
      }
    ];
    var mapOptions = {
      zoom: cZoom,
      center: new google.maps.LatLng(),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: true
    };
    var mapObj = new google.maps.Map( document.getElementById( mapId ), mapOptions );
    // ���� ce �ɒl�������Ă��Ȃ����
    if( ce == undefined){
      // �w�肵��lat,lng�i�X�܈ꗗ�̒��S���W�j
      mapObj.setCenter( new google.maps.LatLng( cLat, cLng ) );
    }
    // ���� ce �ɒl�������Ă����
    else{
      // index�ɊY������X�܂�lat,lng���Q��
      mapObj.setCenter( new google.maps.LatLng( shop[ce].lat, shop[ce].lng ) );
    }
    // ���� zm �ɒl�������Ă���� zm ���Q��
    if( zm != undefined )
      mapObj.setZoom(zm);

    $.each(shop, function(i){
      var latlng = new google.maps.LatLng(shop[i].lat, shop[i].lng);
      var infoContent=
        '<div class="gmapOpen_InfoWindow">'
          + '<dl class="gmapOpen_wrapContent">'
            + '<dt class="gmapOpen_shopName">' + shop[i].name +'</dt>'
            + '<dd class="gmapOpen_shopLocation">'
              + '<span class="gmapOpen_addressTitle">�Z���F</span>'
              + '<span class="gmapOpen_shopZip">��' + shop[i].zip + '</span>'
              + '<span class="gmapOpen_shopAddress">' + shop[i].addr + '</span>'
            + '</dd>'
            + '<dd class="gmapOpen_shopContact">'
              + '<span class="gmapOpen_telTitle">TEL�F</span>'
              + '<span class="gmapOpen_shopTel">' + shop[i].tel + '</span>'
            + '</dd>'
            + '<dd class="gmapOpen_shopUrl">'
              + '<a class="gmapOpen_shopLink" href="' + shop[i].href + '" target="' + shop[i].target + '">'
                + '<span class="gmapOpen_linkText">�ڂ����͂�����</span>'
              + '</a>'
            + '</dd>'
          + '</dl>'
        '</div>'
      ;

      if( iconImg !== "" ){
        var marker = new google.maps.Marker({
            icon: new google.maps.MarkerImage(shop[i].marker, shop[i].mkrSz, shop[i].mkrPos, shop[i].mkrOf),
            position: latlng,
            map: mapObj
        });
      } else{
        var marker = new google.maps.Marker({
          position: latlng,
          map: mapObj
       });
      }

      if( ce == undefined && zm == undefined ){
        google.maps.event.addListener(marker, 'click', function(e){
          mapObj.setZoom(wZoom);
          mapObj.setCenter(latlng);

          var infowindow = new google.maps.InfoWindow({
            content:infoContent
          });

          if(infowindow)infowindow.close();

          infowindow.open(mapObj, marker);
        });
      }
    });
  });
};