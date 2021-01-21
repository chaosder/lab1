
var fs = require("fs");
var str = fs.readFileSync('./test.txt', 'utf8');
// console.log(str);
// console.log(typeof str)
// 打印属性

var img = str.match(/!\[.*\]\(.*\)/g);
// 这里应该匹配出了一个列表，然后列表里面有图片的markdown格式就被找到了。
var re1 = /\(.*\)/;
// 正则括号内的内容
var re2 = /\[.*\]/;
// 这里正则方括号内的内容
if (img) {
    for (i = 0, len = img.length; i < len; i++) {
        var url = img[i].match(re1)[0];
        // 循环出第一个内容就是链接
        var title = img[i].match(re2)[0];
        // 循环出第二个内容就是标题
        str = str.replace(img[i], '<img src=' + '"' + url.substring(1, url.length - 1) + '"' + ' alt=' + '"' + title.substring(1, title.length - 1) + '"' + '>');
        // 这里替换把图片的匹配列表内容逐次替换为HTML能认识的
    }
}
var a = str.match(/\[.*\]\(.*\)/g);
if (a) {
    for (i = 0, len = a.length; i < len; i++) {
        var url = a[i].match(re1)[0];
        var title = a[i].match(re2)[0];
        str = str.replace(a[i], '<a href=' + '"' + url.substring(1, url.length - 1) + '"' + '>' + title.substring(1, title.length - 1) + '</a>');
    }
}


while (headling = str.match(/^(#{1,6})([^#\n]+)$/m) !== null) {
    var headling = str.match(/^(#{1,6})([^#\n]+)$/m) ;
    var num = headling[1].length;
    var data = headling[2];
    str = str.replace(headling[0], '<h' + num + '>' + escape(data.trim()) + '</h' + num + '>').trim();


}

// console.log(headling[0])
// // 全部匹配的内容
// console.log(headling[1])
// var num = headling[1].length;
// console.log(num)
// #有多少个
// console.log(headling[2])
// // #号后面的内容
console.log(str)