/**
 * 滑块验证
 *
 */
import $ from "jquery";
function SlideBar(){

    var box = $('.slide_box'),
    imgBox = $('.imgBox'),
    handle = $('.handle'),
    swiper = $('.swiper'),
    text = $('.text'),
    verify = $('.verify'),
    verified = $('.verified'),
    refresh = $('.refresh'),
    bg = $(".bg"),//背景
    codebtn = $('#getCode'),
    imgs = [];

    box.hover(function(){
        imgBox.fadeIn(300);
    },function(){
        imgBox.fadeOut(300);
    });
    for (var i = 0; i < 3; i++) {
        imgs.push('' + i + i)
    }

    $(function() {
        // 随机添加背景图
        refreshImg()
        refresh.click(function() {
            e = event || window.event
            e.stopPropagation()
            refreshImg()
            start()
        })
        refresh.attr("onmousedown", "");
        refresh.attr("onmouseup", "");
        refresh.mousedown(function() {
            $(this).addClass('click')
        })
        refresh.mouseup(function() {
            $(this).removeClass('click')
        })
        window.onload = start()
    })

    function start() {
      var verImg = document.getElementsByClassName('verImg')[0];
      // console.log(verImg)
      if (verImg) {
        verImg.onload = function() {
          // 获取图片高度
          var imgH = this.clientHeight
          // 随机生成坐标（图片框固定宽度为300px，高度不定）
          var verX = 100 * (2 + Math.random()), //小于200保证
              verY = imgH / 4 + Math.random() * imgH / 2;
            // 40为模块宽度

            verify.css({
                display:'block',
                  top:verY+'px',
                  'backgroundPosition':-verX+'px'+' '+-verY+'px'
            })
            verified.css({ display: 'block', left: verX+'px', top: verY+'px'})

          // 用户移动滑块函数
          fnDown(verX, verY)

        }
      }
    }

    function fnDown(verX, verY) {

        if ( swiper.setCapture ) {
            swiper.setCapture();
        }
        swiper.mousedown(function(e) {

    //		obj = event.srcElement ? event.srcElement : event.target;
            e=window.event||e;
            if(document.all){  //只有ie识别
                e.cancelBubble=true;
            }else{
                e.stopPropagation();
            }
            // 获取鼠标到按钮的距离
            var disX = e.clientX - $(this).offset().left,
                disY = e.clientY - $(this).offset().top,
                curX = e.clientX;
            swiper.css({'background':'#4391fb','color':'#fff'});
            // 防止重复绑定触发多次
            box.unbind('mousemove')
            box.unbind('mouseup')

            // 移动
            box.bind('mousemove', function(event) {
              e = event || window.event
              fnMove(e, disX, disY)
            })

            // 释放
            box.bind('mouseup', function() {
                if ( swiper.releaseCapture ) {
                    swiper.releaseCapture();
                }
              var stopL = verify.offset().left,
                    distance = stopL-(curX-disX);  //鼠标滑动距离
              // 误差在10px以内则算做成功
              if (Math.abs(distance-verX) < 10){  //判断鼠标滑动距离是否和右侧滑块左定位距离差在10px
                  if(1){   //没输入手机号图片验证正确时
                    getToken()
                        imgBox.fadeOut(300);
                        bg.css('background','#d2f4ef');
                        swiper.css({'background':'#52ccba','color':'#fff'})
                        box.unbind('mousemove').unbind('mouseup')
                        setTimeout(function(){
                            bg.css({'background':'#d2f4ef','width':'0'});
                            swiper.css({'background':'#fff','color':'#adaaaa','left':'0'})
                        },400)
                  }else{
                      box.unbind('mouseenter').unbind('mouseleave').unbind('mousedown').unbind('mouseup').unbind('mousemove')
                      swiper.unbind('mousedown')
                      imgBox.fadeOut(200);
                      bg.css('background','#d2f4ef');
                      swiper.css({'background':'#52ccba','color':'#fff'})
                      codebtn.css({'color':'#4391FB'})
                      codebtn.attr("disabled",false)
                      getToken();
                  }

              } else {
                  // 解除绑定，并将滑动模块归位
                  bg.css({'background':'#ff5c57'})
                  swiper.css({'background':'#ce2b26','color':'#fff'})
                  swiper.text("X")
                  box.unbind('mousemove')
                  box.unbind('mouseup')
                  setTimeout(function(){
                      bg.css('width', '0px')
                      swiper.css('left', '0px')
                      verify.css('left', '10px')
                      text.css('opacity', '1')
                      bg.css({'background':'#5997ec'})
                      swiper.css({'background':'#fff','color':'#adaaaa'})
                      swiper.text(">>")
                      refreshImg()
                  },500)

              }

            })
        })
    }
    function fnMove(e, posX, posY) {
      // 这里的e是以鼠标为参考
      var l = e.clientX - posX - $(handle).offset().left,
        winW = $(handle).width() + 29
      // 限制拖动范围只能在handle中
      if (l < 0) {
        l = 0
      } else if (l > winW) {
        l = winW
      }
      text.css('opacity', '0')
      bg.css('width', l+'px');
      swiper.css('left', l+'px')
      verify.css('left', l + 2+'px')
    }

    function refreshImg() {
        // 随机生成下标
        var index = Math.round(Math.random() * 2);
            // imgH = 0;
        var verImg = $('.verImg');
        var img = $('<img class="verImg" style="width:100%;border-radius: 4px;" src="'+'static/images/'+ imgs[index] + '.png'+ '">');
        if(verImg.length){
            verImg.attr('src', 'static/images/'+imgs[index]+'.png');
        }else{
            imgBox.prepend(img);
        }
        verify.css('background-image', 'url(static/images/'+imgs[index]+'.png)')
    }
}




export default SlideBar;
