var Carousel = (function() {
  function Carousel() {
    var c =  this;
    this._target = document.getElementById('carousel');
    this._carousel = this._target.querySelector('.main_carousel');
    new Slider(c._carousel, 'left');
  }
  return Carousel;
})()
var Slider = (function() {
  function Slider(el, direction) {
    var s = this;
    this.ul_child = el.querySelector('ul');
    this.ul_width = 0;
    this.ul_height;
    this.scale = 1;
    Array.prototype.forEach.call(s.ul_child.children, function(ele, i) {
      s.ul_width += ele.clientWidth;
      s.ul_width += parseFloat(getCssProperty(ele,'margin-left'));
      s.ul_width += parseFloat(getCssProperty(ele,'margin-right'));
      // ele.style.float = direction;
    });
    if (direction == 'left') {
      s.ul_child.style[fdProperty] = 'row';
    }
    if (direction == 'right') {
      s.ul_child.style[fdProperty] = 'row-reverse';
    }
    this.widthframe = this.ul_width;
    this.ul_child.style.width = this.ul_width + 'px';
    this.ul_child.style.height = this.ul_height + 'px';
    el.style.height = this.ul_height + 'px';
    this.ul_clone = this.ul_child.cloneNode(true);
    el.appendChild(this.ul_clone);
    this.timer;
    this.getRandomArbitrary = function(min, max) {
      return Math.random() * (max - min) + min;
    }
    if (direction === 'left') {
      this.basicleft = s.getRandomArbitrary(-this.widthframe, 0);
      this.cloneleft = this.widthframe - Math.abs(this.basicleft);
      this.ul_child.style.left = 0;
      this.ul_clone.style.left = s.widthframe + 'px';
    }
    if (direction === 'right') {
      this.basicleft = s.getRandomArbitrary(0, this.widthframe);
      this.cloneleft = -s.widthframe + this.basicleft;
      this.ul_clone.style.left = -s.widthframe + 'px';
      this.ul_child.style.left = 0;
    }
    this.step = 0.5;
    this.handling = function() {
      if (direction === 'left') {
        s.basicleft = s.basicleft - s.step;
        s.ul_child.style.left = s.basicleft + 'px';
        if (Math.abs(s.basicleft) > s.widthframe) {
          s.basicleft = s.widthframe;
        }
        s.cloneleft = s.cloneleft - s.step;
        s.ul_clone.style.left = s.cloneleft + 'px';
        if (Math.abs(s.cloneleft) > s.widthframe) {
          s.cloneleft = s.widthframe;
        }
        s.timer = window.requestAnimFrame(s.handling);
      }
      if (direction === 'right') {
        s.basicleft = s.basicleft + s.step;
        s.ul_child.style.left = s.basicleft + 'px';
        if (Math.abs(s.basicleft) > s.widthframe) {
          s.basicleft = -s.widthframe;
        }
        s.cloneleft = s.cloneleft + s.step;
        s.ul_clone.style.left = s.cloneleft + 'px';
        if (Math.abs(s.cloneleft) > s.widthframe) {
          s.cloneleft = -s.widthframe;
        }
        s.timer = window.requestAnimFrame(s.handling);
      }
    }
    // reset
    this.reset = function() {
      s.ul_width = 0;
      Array.prototype.forEach.call(s.ul_child.children, function(ele, i) {
        s.ul_width += ele.clientWidth;
        s.ul_width += parseFloat(getCssProperty(ele,'margin-left'));
        s.ul_width += parseFloat(getCssProperty(ele,'margin-right'));
      });
      s.widthframe = s.ul_width;
      s.ul_child.style.width = s.ul_width + 'px';
      s.ul_clone.style.width = s.ul_width + 'px';
      if (direction === 'left') {
        s.basicleft = s.getRandomArbitrary(-s.widthframe, 0);
        s.cloneleft = s.widthframe - Math.abs(s.basicleft);
        s.ul_child.style.left = 0;
        s.ul_clone.style.left = s.widthframe + 'px';
      }
      if (direction === 'right') {
        s.basicleft = s.getRandomArbitrary(0, this.widthframe);
        s.cloneleft = -s.widthframe + s.basicleft;
        s.ul_clone.style.left = -s.widthframe + 'px';
        s.ul_child.style.left = 0;
      }
    }
    // end reset
    // resize
    this.rtime;
    this.timeout = false;
    this.delta = 200;
    this.screen = window.innerWidth;
    this.resizeend = function() {
      if (new Date() - s.rtime < s.delta) {
        setTimeout(s.resizeend, s.delta);
      } else {
        s.timeout = false;
        s.reset();
        s.screen = window.innerWidth;
        s.handling()
      }
    }
    window.addEventListener('resize', function() {
      if (s.screen != window.innerWidth) {
        s.rtime = new Date();
        window.cancelAnimFrame(s.timer)
        if (s.timeout === false) {
          s.timeout = true;
          setTimeout(s.resizeend, s.delta);
        }
      }
    });
    // end resize
    this.handling();
  }
  return Slider;
})()
window.addEventListener('load', function() {
  new Carousel();
})