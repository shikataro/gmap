/**
 * pluginname
 *
 * @version      0.01
 * @author       name (name@gmail.com)
 * @copyright    sitename (http://sitename.com/)
 * @license      The MIT License
 * @link         https://github.com/sitename/pluginname
 *
 * yyyy-mm-dd hh:ii
 */
;(function($){
    $.fn.gmap = function(options){
        // console.log( this ); // => element who fired event.

        // Create some defaults, extending them with any options that were provided.
        var settings = $.extend( {
            marker     : [],
            center     : null,        // 地図の中心緯度経度
            zoom       : 10,          // 拡大率
            style      : false,       // 地図の外観設定
            close      : null,        // クリックしたときの拡大率
            scale      : false,        // 拡大の有効 / 無効 
            wheel      : false,        // マウスホイールの拡大・縮小
            show       : 'click',     // infoWindowの表示イベント
            hide       : 'mouseover', // infoWindowの閉じイベント
            setCenter  : false,       // infoWindow出現時に地図の中心を該当店舗にする？
            panTo      : false,       // infoWindow出現時に地図の中心を該当店舗にする？ w/ アニメーション？
            smoothZoom : 80,          // infoWindow出現時に拡大 + 地図の中心を該当店舗にする？ w/ アニメーション？
            direct     : false,       // アイコンをクリックしたときにリンクする？
            preUrl     : '',          // hrefの前部分
            serial     : '223'        // ***_sr.html?shop=""
        }, options);





        return this.each(function(){
            $this = $(this);
            var iwArray = [];

            // the smooth zoom function
            function smoothZoom (map, max, cnt) {
                if(cnt >= max) {
                    return;
                } else{
                    var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
                        google.maps.event.removeListener(z);
                        smoothZoom(map, max, cnt + 1);
                    });
                    setTimeout( function(){map.setZoom(cnt)}, settings.smoothZoom); // 0ms is what I found to work well on my system -- it might not work well on all systems
                }
            }

            // infoWindow open.
            function infoShow (marker, latlng, infoContent ) {
                var map = marker.getMap();

                if( settings.setCenter || settings.close ){
                    map.setCenter(latlng);
                    map.setZoom(settings.close);
                }
                if( settings.panTo || settings.smoothZoom ){
                    map.panTo(latlng);
                }
                if( settings.smoothZoom ){
                    smoothZoom(map, settings.close, map.getZoom());
                }

                var infowindow = new google.maps.InfoWindow({
                    content:infoContent
                });
                iwArray.push(infowindow); // 配列にinfowindowを突っ込む

                var match = 0;
                $.each(iwArray, function(i){
                    if( iwArray[i].content == infoContent ){
                        match++;
                    }
                });
                if( match <= 1 ){
                    infowindow.open(map, marker); // infowindow開く
                }
            }

            // infoWindow close.
            function infoHide () {
                $.each(iwArray, function(i){
                    iwArray[i].close();// iwArrayの中身を消す
                })
                iwArray = [];
            }



            google.maps.event.addDomListener(window, 'load', function(){
                var mapId = $this.attr('id');
                if( settings.style ){
                    var styleOptions = [
                        {
                            featureType: "water",
                            elementType: "all",
                            stylers: [
                                { visibility: "on" },
                                { hue: "#00e5ff" },
                                { gamma: 0.93 },
                                { saturation: -63 },
                                { lightness: -18 }
                            ]
                        },{
                            featureType: "landscape.natural",
                            elementType: "all",
                            stylers: [
                                { hue: "#fff700" },
                                { lightness: 89 },
                                { saturation: -90 }
                            ]
                        },{
                            featureType: "landscape.man_made",
                            elementType: "all",
                            stylers: [
                                // { hue: "#ff3c00" },
                                // { lightness: -33 },
                                // { saturation: -44 },
                                // { gamma: 0.94 }
                          ]
                        },{
                            featureType: "transit.station.rail",
                            elementType: "all",
                            stylers: [
                                { gamma: 0.33 },
                                { saturation: -90 },
                                { lightness: 28 }
                            ]
                        },{
                            featureType: "transit.line",
                            elementType: "all",
                            stylers: [
                                { saturation: -99 },
                                { gamma: 0.64 },
                                { lightness: 34 }
                            ]
                        },{
                            featureType: "road",
                            elementType: "all",
                            stylers: [
                                { saturation: -27 }
                            ]
                        },{
                            featureType: "poi.park",
                            elementType: "all",
                            stylers: [
                                { visibility: "simplified"},
                                { saturation: -40 },
                                { gamma: 0.48 },
                                { lightness: -13 }
                            ]
                        },{
                            featureType: "road",
                            elementType: "labels",
                            stylers: [
                                { hue: "#2200ff"},
                                { saturation: -18 },
                                { gamma: 0.69 }
                            ]
                        }
                    ];
                } else{
                    var styleOptions = [];
                }

                var mapOptions = {
                    zoom         : settings.zoom,
                    center       : new google.maps.LatLng( settings.center[0], settings.center[1] ),
                    mapTypeId    : google.maps.MapTypeId.ROADMAP,
                    scaleControl : settings.scale,
                    scrollwheel  : settings.wheel,
                    styles       : styleOptions
                };

                var mapObj = new google.maps.Map( document.getElementById( mapId ), mapOptions );

                if( settings.center ){
                    mapObj.setCenter( new google.maps.LatLng( settings.center[0], settings.center[1] ) );
                } else{
                    mapObj.setCenter( new google.maps.LatLng( settings.marker['01'].lat, settings.marker['01'].lng ) );
                }



                $.each(settings.marker, function(i){

                    var latlng = new google.maps.LatLng(settings.marker[i]['lat'], settings.marker[i]['lng']);

                     if( settings.marker[i].marker ){
                        var iconImg      = settings.marker[i].marker,
                            iconSize     = new google.maps.Size( settings.marker[i].mkrSz[0], settings.marker[i].mkrSz[1] ),
                            iconPosition = new google.maps.Point( settings.marker[i].mkrPos[0], settings.marker[i].mkrPos[1] ),
                            iconOffset   = new google.maps.Point( settings.marker[i].mkrOf[0], settings.marker[i].mkrOf[1] );

                        var marker = new google.maps.Marker({
                            icon: new google.maps.MarkerImage( iconImg, iconSize, iconPosition, iconOffset ),
                            position: latlng,
                            map: mapObj
                        });
                     } else{
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: mapObj
                        });
                     }

                    var infoContent =
                        '<div class="gmapOpen_InfoWindow">'
                        + '<dl class="gmapOpen_wrapContent">'
                            + '<dt class="gmapOpen_shopName">' + settings.marker[i]['shop_name'] +'</dt>'
                            + '<dd class="gmapOpen_shopLocation">'
                                + '<span class="gmapOpen_addressTitle">住所：</span>'
                                + '<span class="gmapOpen_shopZip">〒' + settings.marker[i]['zip'] + '</span>'
                                + '<span class="gmapOpen_shopAddress">' + settings.marker[i]['address'] + '</span>'
                            + '</dd>'
                            + '<dd class="gmapOpen_shopContact">'
                                + '<span class="gmapOpen_telTitle">TEL：</span>'
                                + '<span class="gmapOpen_shopTel">' + settings.marker[i]['tel'] + '</span>'
                            + '</dd>'
                            + '<dd class="gmapOpen_shopUrl">'
                                + '<a class="gmapOpen_shopLink" href="' + settings.preUrl + settings.serial + '_sr'+ settings.marker[i]['shop_cd'] +'.html" target="' + settings.marker[i]['target'] + '">'
                                    + '<span class="gmapOpen_linkText">詳しくはこちら</span>'
                                + '</a>'
                            + '</dd>'
                        + '</dl>'
                        '</div>';



                    if( settings.close && !settings.direct ){
                        if( settings.show == settings.hide ){
                            google.maps.event.addListener(marker, settings.show, function(e){
                                infoHide();
                                infoShow(marker, latlng, infoContent);
                            });
                        } else{
                            google.maps.event.addListener(marker, settings.show, function(e){
                                infoShow(marker, latlng, infoContent);
                            });
                            if( settings.hide ){
                                google.maps.event.addListener(marker, settings.hide, function(e){
                                    infoHide();
                                });
                            }
                        }
                    } else if( settings.direct ){
                        google.maps.event.addListener(marker, 'click', function(e){
                            location.href = '/home/' + settings.serial + '_sr.html?shop=' + settings.marker[i]['shop_cd'];
                        });
                    }
                });

            });

/*
            $this.fadeOut(400, function(){
                $this.hide(); // => "this = DOM". it must be surrounded by '$'.
            });
*/

        }); // return for 'Method Chain' end.
    }; // end gmap.
})(jQuery);