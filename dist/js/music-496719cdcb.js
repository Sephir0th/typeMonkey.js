"use strict";function musicGoing(){var i=music.$mp3,e=i.currentTime,t=1e3*e;if(i.currentTime>=i.duration)return musicStop(),!1;if(i.paused)return!1;for(var n=0,s=music.lrc.list,c=s.length;n<c;n++)if(t>=s[n].time&&(n===c-1||t<s[n+1].time)){if(music.currentID===n)break;music.currentID=n,tm.next();break}requestAnimationFrame(musicGoing)}function musicAction(){music.$mp3.play(),music.playing=requestAnimationFrame(musicGoing)}function musicStop(){music.$mp3.stop=!0,cancelAnimationFrame(music.playing),$cover.classList.remove("hide")}function musicPause(){music.$mp3.pause(),cancelAnimationFrame(music.playing)}function addWindowListen(){var i,e,t;"undefined"!=typeof document.hidden?(i="hidden",t="visibilitychange",e="visibilityState"):"undefined"!=typeof document.mozHidden?(i="mozHidden",t="mozvisibilitychange",e="mozVisibilityState"):"undefined"!=typeof document.msHidden?(i="msHidden",t="msvisibilitychange",e="msVisibilityState"):"undefined"!=typeof document.webkitHidden&&(i="webkitHidden",t="webkitvisibilitychange",e="webkitVisibilityState"),document.addEventListener(t,function(){document[e]===i?musicPause():musicAction()},!1)}function get(i,e){var t=new XMLHttpRequest;t.open("GET",i),t.onload=function(){200==this.status&&e(this.response)},t.send()}function lrcFormat(i){var e={ti:/\[ti[:：](.*)\]/,ar:/\[ar[:：](.*)\]/,al:/\[al[:：](.*)\]/,by:/\[by[:：](.*)\]/,offset:/\[offset[:：](-?\d*)\]/,rowLyric:/((\[\d+[:：]\d+[\.:：]?\d*\])+)(.*)/,times:/\[\d+[:：]\d+[\.:：]?\d*\]/g,time:/\[(\d+)[:：](\d+)[\.:：]?(\d*)\]/},t={list:[]},n=i.split("\n"),s=void 0;return n.forEach(function(i,n){if(s=i.match(e.ti))t.ti=s[1];else if(s=i.match(e.ar))t.ar=s[1];else if(s=i.match(e.al))t.al=s[1];else if(s=i.match(e.by))t.by=s[1];else if(s=i.match(e.offset))t.offset=s[1];else if(s=i.match(e.rowLyric)){var c=s[3],a=s[1],m=a.match(e.times);m.forEach(function(i,n){var s=i.match(e.time);t.list.push({timeTag:i,m:s[1],s:s[2],ms:s[3],time:60*s[1]*1e3+1e3*s[2]+10*s[3]+(parseInt(t.offset)||0),lrc:c})})}}),t.list.sort(function(i,e){return i.time-e.time}),{data:i,lrc:t}}var $demo=document.getElementById("demo"),$tm=document.getElementById("tm"),$cover=document.getElementById("cover"),requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,music={src:"../img/music/csb.mp3",lrcSrc:"../img/music/csb.lrc",init:function(i){this.lrc=i,this.$pre=tm.h("div",{"class":"music-info"},'\n        <div class="con">\n          <div class="ti">\n            <span>'+i.ti+'</span>\n          </div>\n          <div class="ar">\n            <span>'+i.ar+'</span>\n          </div>\n          <div class="lrc-ar">\n            <span>lrc by '+i.by+'</span>\n          </div>\n          <div class="action">\n            <span>开始播放</span>\n          </div>\n        </div>\n      ');var e=[14,41,81,98,104,123],t=[24,66,74,114,130,141],n=[4,9,13,19,25,28,31,35,38,40,50,53,58,60,72,73,87,108,113,125,126,135,136,140,150],s=i.list.reduce(function(i,s,c){e.findIndex(function(i){return i===c})>-1?i.push({type:"rotate",value:"lb"}):t.findIndex(function(i){return i===c})>-1&&i.push({type:"rotate",value:"rb"});var a={type:"text",value:s.lrc};return n.findIndex(function(i){return i===c})>-1&&(a.color="#fe131a"),i.push(a),i},[]);this.$pre.addEventListener("click",function(i){$cover.classList.add("hide"),tm.init(s),addWindowListen(),musicAction()},!1),$cover.appendChild(this.$pre)}},tm=new TypeMoneky({box:$tm,background:"transparent",beforeCreate:function(i,e,t){i()}});music.$mp3=tm.h("audio",{"class":"tm-audio",preload:!0,src:music.src,style:{position:"absolute",visibility:"hidden"}}),$demo.appendChild(music.$mp3),get(music.lrcSrc,function(i){music.init(lrcFormat(i).lrc)});