;(function(){
    var PlaceHolder =  function(Node){
        var t ;
        this.node = Node;
        this.placeHolder;
        this.autoElement;
        this.input
        this.ElementOrder = 0;/** 显示的字的下标*/
        this.init();
        
    }
    PlaceHolder.prototype = {
        init : function(){
            var config;
            config = this.getConfig();
            this.setConfig(config);
            this.bindEvent();
        },
        bindEvent : function(){
            var _self = this,
              autoplay = this.autoplay.bind(this);
            this.autoChange();
            t = setInterval(function(){
                _self.autoChange();
            },1000);
            console.log(t);
            addEvent(this.input,'focus',this.stopplay);
            addEvent(this.input,'blur', autoplay);
        },
        stopplay : function(){
            clearInterval(t);
        },
        autoplay : function(){
            var _self = this;
            t = setInterval(function(){
                _self.autoChange();
            },1000);
        },
        getConfig : function(){
            return  JSON.parse(this.node.getAttribute('data-config'));
           
        },
        setConfig : function(Elem){
            this.input = document.getElementsByClassName(Elem.input)[0];
            this.placeHolder = document.getElementsByClassName(Elem.placeHolder)[0];
            this.autoElement = JSON.parse(this.placeHolder.innerHTML);
        },
        autoChange : function(){
            var _self = this,
                  len = _self.autoElement.length;
                
            _self.placeHolder.innerHTML = _self.autoElement[_self.ElementOrder];
            if('placeHolderWrap active' !== _self.placeHolder.className){
                /**省的一直在加 */
                _self.placeHolder.className += ' active';
            }
            console.log(_self.placeHolder.innerHTML);
            _self.ElementOrder = _self.ElementOrder > (len - 2)
                              ?  0
                              :  _self.ElementOrder + 1;/**每次加一，直到大于len-2变成0 */ 
        }
    }
    window.PlaceHolder = PlaceHolder;
})();

new PlaceHolder(document.getElementsByClassName('wrap')[0]);