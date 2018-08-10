var helper = {
  noop: function () {},
  /**
   * 获取图像的编号
   * @param  {[type]} ) {               var id [description]
   * @return {[type]}   [description]
   */
  uid: (function uid () {
    var id = 0
    return function() {
      return id++
    }
  }()),
  /**
   * 判断是不是数组
   * @param  {[type]} arg [description]
   * @return {[type]}     [description]
   */
  isArray (arg) {
    return Array.isArray(arg)
  },
  /**
   * 判断是不是对象
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  isPlainObject (arg) {
    return Object.prototype.toString.call(arg) === '[object Object]'
  },
  isNull (arg) {
    if (typeof arg === 'object' && arg === null) {
      return true
    }
    return false
  },
  isUndefined (arg) {
    if (arg === undefined) {
      return true
    }
    return false
  },
  isNullOrUndefined (arg) {
    if (helper.isNull(arg)) {
      return true
    }
    if (helper.isUndefined(arg)) {
      return true
    }
    return false
  },
  /**
   * @param  需要复制的对象
   * @return  返回复制后的对象
   */
  clone (orgin) {
    let target , i
    if (helper.isPlainObject(orgin)) {
      target = {}
      for (i in orgin) {
        if (helper.isPlainObject(orgin[i]) || helper.isArray(orgin[i])) {
          target[i] = helper.clone(orgin[i])
        } else {
          target[i] = orgin[i]
        }
      }
    } else if (helper.isArray(orgin)) {
      target = []
      for( i = 0; i < orgin.length; i++) {
        if (helper.isPlainObject(orgin[i]) || helper.isArray(orgin[i])) {
          target.push(helper.clone(orgin[i]))
        } else {
          target[i] = orgin[i]
        }
      }
    }
    return target
  },
  // 子项合并
  _merge (key, target, origin, _merge) {
    if (helper.isPlainObject(origin[key]) || helper.isArray(origin[key])) {
      target[key] = helper.clone(origin[key])
    } else {
      target[key] = origin[key]
    }
  },
  // 对象合并
  merge (target, ...args) {
    let i, j
    for(i = 0; i < args.length; i++) {
      for (j in args[i]) {
        if (target.hasOwnProperty(j)) {
          if (helper.isPlainObject(target[j])) {
            helper.merge(target[j], args[i][j])
          } else if (helper.isArray(target[j])){
            target[j] = helper.clone(args[i][j])
          } else {
            target[j] = args[i][j]
          }
        } else {
          helper._merge(j, target, args[i])
        }
      }
    }
    return target
  },
  /**
   * callback函数调用
   * @param  {Function} fn      [description]
   * @param  {[type]}   args    [description]
   * @param  {[type]}   thisArg [description]
   * @return {Function}         [description]
   */
  callback: function(fn, args, thisArg) {
    if (fn && typeof fn.call === 'function') {
      return fn.apply(thisArg, args);
    }
  },
  each(target, callback, reseve = false) {
    if (helper.isArray(target)) {
      if (reseve) {
        for(var i = target.length - 1; i >= 0; i--) {
          var ret = callback(target[d], i)
          if (!ret) {
            return false
          }
        }
      } else {
        for(var i = 0; i < target.length; i++) {
          var ret = callback(target[i], i)
          if (!ret) {
            return false
          }
        }
      }
    } else if (helper.isPlainObject(target)) {
      var keys = Object.keys(target)
      for(var i = 0; i < keys.length; i++) {
        callback(target[keys[i]], keys[i])
      }
    }
  },
  /**
   * 继承,主要是函数和原型的继承
   * @return {[type]} [description]
   */
  extend(target, ...args) {
    var setFn = function (val, key) {
      target[key] = val
    }
    helper.each(args, function (d, i) {
      helper.each(d, setFn)
      return true
    })
    return target
  },
  inherits (extensions) {
    var me = this
    var ChartElement = (extensions && extensions.hasOwnProperty('constructor')) ? extensions.constructor : function() {
      return me.apply(this, arguments)
    }
    var Surrogate = function() {
      this.constructor = ChartElement
    };

    Surrogate.prototype = me.prototype
    ChartElement.prototype = new Surrogate()
    ChartElement.extend = helper.inherits

    if (extensions) {
      helper.extend(ChartElement.prototype, extensions)
    }

    ChartElement.__super__ = me.prototype
    return ChartElement
  }
}
module.exports = helper
