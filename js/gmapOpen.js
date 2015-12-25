  /*
  gmapOpen();　←店舗一覧の場合
  gmapOpen( 拡大率(世界地図 0-12 最拡大),（中心座標にする店舗 ※下記参照） );
   例 gmapOpen(15,2); ← 15の拡大率で、2 の店舗を中心に表示
   
    0 城南店
    1 喜沢店
    2 上三川店
    3 真岡工業団地店
    4 細谷店
    5 簗瀬店
    6 宮の内店
    7 オートテラス宇都宮東
  */
function gmapOpen (zm, ce){
  google.maps.event.addDomListener(window, 'load', function(){
    var mapId = 'gmap'; // gmap表示箇所のID
    var cLat  = 36.464699; // 店舗が設定されていないときの中心緯度
    var cLng  = 139.8983; // 店舗が設定されていないときの中心経度
    var cZoom = 10; // 店舗が設定されていないときの拡大率
    var wZoom = 12; // iconがクリックされたときの拡大率
    var iconImg      = "";
    // var iconImg = "img/red-dot.png";
    var iconSize     = new google.maps.Size(32, 32);
    var iconPosition = new google.maps.Point(0, 0);
    var iconOffset   = new google.maps.Point(16, 16);
      var iconOffset___ShopName___ = new google.maps.Point(0, 0);

    // mapの表示形式を設定
    var shop = [
      { // 0
          name: "城南店",
           zip: "323-0829",
          addr: "栃木県小山市東城南1-3-13",
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
    // 引数 ce に値が入っていなければ
    if( ce == undefined){
      // 指定したlat,lng（店舗一覧の中心座標）
      mapObj.setCenter( new google.maps.LatLng( cLat, cLng ) );
    }
    // 引数 ce に値が入っていれば
    else{
      // indexに該当する店舗のlat,lngを参照
      mapObj.setCenter( new google.maps.LatLng( shop[ce].lat, shop[ce].lng ) );
    }
    // 引数 zm に値が入っていれば zm を参照
    if( zm != undefined )
      mapObj.setZoom(zm);

    $.each(shop, function(i){
      var latlng = new google.maps.LatLng(shop[i].lat, shop[i].lng);
      var infoContent=
        '<div class="gmapOpen_InfoWindow">'
          + '<dl class="gmapOpen_wrapContent">'
            + '<dt class="gmapOpen_shopName">' + shop[i].name +'</dt>'
            + '<dd class="gmapOpen_shopLocation">'
              + '<span class="gmapOpen_addressTitle">住所：</span>'
              + '<span class="gmapOpen_shopZip">〒' + shop[i].zip + '</span>'
              + '<span class="gmapOpen_shopAddress">' + shop[i].addr + '</span>'
            + '</dd>'
            + '<dd class="gmapOpen_shopContact">'
              + '<span class="gmapOpen_telTitle">TEL：</span>'
              + '<span class="gmapOpen_shopTel">' + shop[i].tel + '</span>'
            + '</dd>'
            + '<dd class="gmapOpen_shopUrl">'
              + '<a class="gmapOpen_shopLink" href="' + shop[i].href + '" target="' + shop[i].target + '">'
                + '<span class="gmapOpen_linkText">詳しくはこちら</span>'
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