//1. 首先声明一个自执行函数，并定义两个形参：global 和 factory
(function(global, factory){
    //4. 浏览器环境下：global -> window ， Node环境下：global -> 当前模块
    //	 factory: 回调函数
    "use strict" //开启严格模式
    
    if(typeof module === "object" && typeof module.exports === "object"){
       //5. 支持CommonJS模块规范环境：Node环境
       //	 用module.exports导出
       //	 global.document判断模块下是否有document
       module.exports = global.document ? 
           //如果有document则调用回调函数factory传入当前模块，并将factory返回的结果导出
           factory(global, true) : 
           //如果没有document则定义一个函数并导出
           function(w){
               if(!w.document){
                   throw new Error("jQuery requires a window width a document")
               }
               return factory(w);
           }
    }else{
       //6. 浏览器环境（不支持CommonJS规范）
       factory(global);//调用回调函数，并传入window，浏览器环境下global就是window
    }
    
    //2. 在函数执行时传递了两个实参分别是：typeof window !== "undefined" ? window : this 和一个函数function(window, noGlobal){...}
    })(typeof window !== "undefined" ? window : this, function(window, noGlobal){...})
    
    //3. 第一个参数利用了JS的暂时死区这一特点：基于typeof检测一个未被声明的变量不会报错，而是返回undefined。
    //   这个参数主要是用于区分是浏览器环境还是非浏览器环境（node）
    //		+ 在浏览器环境和APP的webview环境下：默认是有window的
    //		+ 在Node环境下：没有window， this指向当前模块
    //	 typeof window !== "undefined" ? window : this
    
    
    
    //7. 第二个参数是一个匿名函数：function(window, noGlobal){...}，函数中则是jQuery的核心代码
    //	 这个函数将作为第二个参数传递个上面的自执行函数，也就是形参factory
    function(window, noGlobal){
    //8. 通过上面自执行函数中if和else中调用的factory我们可分析得知：
    //		+ 浏览器环境下：window -> window, noGlobal -> undefined(因为调用factory时没传第二个参数)
    //		+ Node 环境下：window -> this（当前模块） noGlobal -> true
    
       //在这个函数中又声明了一个函数并赋值给jQuery，这里会形成闭包
       var jQuery = function(){
       
       }
       
       //9. 给浏览器环境使用，基于window.xxx=xxx的方式，把jQuery暴露到全局
       //   在外部使用jQuery() 或者 $()实际都是把内部的jQuery执行
       //   这里通过window.xxx暴露出去的东西不宜过多，因为有可能与其它变量冲突
       if(typeof noGlobal === 'undefined'){
           window.jQuery = window.$ = jQuery;
       }
       //11. 为了防止暴露到全局的jQuery和$，	和全局下现有的内容冲突，这里可以提供$等使用权转让
       //把当前window下的jQuery和$先赋值给_jQuery 和 _$
       //	+ 如果jQuery和其它模块冲突，则在导入jQuery之前，window.jQuery = undefined; window.$ = 其他模块
       var _jQuery = window.jQuery,
           _$ = window.$;
    
       //定义函数转让使用权
       jQuery.noConflict = function(deep){
           //12. 解决不同类库冲突：当jQuery与其它模块冲突时，如果调用这个函数，这里会把window.$返还给其它模块
           if(window.$ === jQuery){
               window.$ = _$;//_$是其它模块
           
           //14. 解决不同版本jQuery冲突，如果当前jQuery与其它版本jQuery冲突，则调用这个方法将window.jQuery返还给其它版本的jquery
           if(deep && window.jQuery === jQuery){
               window.jQuery === _jQuery
           }
           //13. 如果冲突调用该方法后这里将jQuery返回，然后外面可以用其它变量接收就避免冲突了。
           return jQuery;
       }
       
       return jQuery;//10. 这句是给Node环境使用的
    }
    