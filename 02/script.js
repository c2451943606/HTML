/*
  Code by Gabriel Nunes
*/
//判断是不是在最顶层窗口
function inIframe () {
  try { 
    //在最顶层窗口 返回FALSE
    return window.self !== window.top; 
  }
  catch (e) {
    return true; 
  } 
}
//颜色变化初始化
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
//文本信息 作者 初始化
var title = '', artist = '';
//打开的网页 初始化
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}


/*

$.ajax({
     //请求类型，这里为POST
     type: 'POST',
     //你要请求的api的URL
     url: url ,
     //是否使用缓存
     cache:false,
     //数据类型，这里我用的是json
     dataType: "json", 
     //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
     data: JSON.strigify({key:value}), //data: {key:value}, 
     //添加额外的请求头
     headers : {'Access-Control-Allow-Origin':'*'},
     //请求成功的回调函数
     success: function(data){
        //函数参数 "data" 为请求成功服务端返回的数据
},
});



*/

function getQuote() {
  $.ajax({
    //设置地址
    url: "music.json",
    ////请求成功的回调函数
    success: function(r) {

      if (typeof r === 'string') {//得到的是字符串 
        //parse() JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
        //简单一点说就是吧字符串变成json对象
       r = JSON.parse(r); 
      }
      //赋值  
      //{"quote":"Open the pod bay doors, HAL.","author":"2001: A Space Odyssey","category":"Movies"}
      //这是返回出的json  因为只有一条 所以  不用随机  他已经随机好给你的
      var num=parseInt(Math.random()*r.music.length);
      if (r.music[num].mp3=='') {
        var num=parseInt(Math.random()*r.music.length);
        alert("歌曲貌似无法播放 - -。\n 自动切换下一首");           
      }
      mp3=r.music[num].mp3;
      title=r.music[num].title;
      artist=r.music[num].artist;
      cover=r.music[num].cover;
      var sourceDom = $("<source src=\""+ mp3 +"\">");
      $("#music").empty()
      $("#music").prepend(sourceDom);
      $('#music')[0].load();
      $('#music')[0].play();
      $("#cover").attr('src', cover);

      //分享 的时候填入文本
      //防止第一次加载时出现
      if(inIframe())
      {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + title + '" ' + artist));
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(artist)+'&content=' + encodeURIComponent(title)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
      }

      //animate（） 设置动画
      $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          //填入文本
          $('#text').text(title);
        });

      //animate（） 设置动画
      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          //填入文本
          $('#author').html(artist);
        });
      
      //产生随机的颜色
      var color = Math.floor(Math.random() * colors.length);

      //animate（） 设置动画
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);

      //animate（） 设置动画
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}

//函数的执行出口
$(document).ready(function() {
  //执行一遍使网页上有数据
  getQuote();
  //进行绑定
  $('#new-quote').on('click', getQuote);


  //分享 进行绑定
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
  //分享 进行绑定
  $('#tumblr-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });
});