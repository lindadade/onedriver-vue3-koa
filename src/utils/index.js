/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {Object} obj
 * @returns {FormData}
 */
export function obj2FormData(obj) {
  const formData = new FormData()
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(item => {
        formData.append(key, item)
      })
    } else {
      formData.append(key, obj[key])
    }
  }
  return formData
}

export function getCurrentMonthFirst() {
  var date = new Date()
  date.setDate(1)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m}-${d}`
}
export function getCurrentMonthLast() {
  var date = new Date()
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  const lastDate = new Date(nextMonthFirstDay - oneDay)
  const y = lastDate.getFullYear()
  const m = lastDate.getMonth() + 1
  const d = lastDate.getDate()
  return `${y}-${m}-${d}`
}

export function fileSize(limit) {
	let size = "";
	if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
		size = limit.toFixed(2) + " B"
	}else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
		size = (limit/1024).toFixed(2) + " KB"
	}else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
		size = (limit/(1024 * 1024)).toFixed(2) + " MB"
	}else{                                            //其他转化成GB
		size = (limit/(1024 * 1024 * 1024)).toFixed(2) + " GB"
	}
	const sizeStr = size + ""
	const index = sizeStr.indexOf(".");                    //获取小数点处的索引
	const dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
	if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
		return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
	}
	return size;
}

export function fileIcon(value) {
	if (!value.includes('.')) {
		return require('../assets/svg/folder.svg')
	}
	const suffix = value.split('.')[1]
	console.log(suffix)
	switch (suffix) {
		case 'pdf':
			return require('../assets/svg/pdf.svg')
			break;
		case 'png': case 'jpg': case 'jpeg': case 'bmp': case 'gif':
			return require('../assets/svg/img.svg')
			break;
		case 'txt':
			return require('../assets/svg/txt.svg')
			break;
		case 'xls': case 'xlsx':
			return require('../assets/svg/excel.svg')
			break;
		case 'doc': case 'docx':
			return require('../assets/svg/world.svg')
			break;
		case 'ppt' : case 'pptx':
			return require('../assets/svg/ppt.svg')
			break;
		case 'mp4': case 'm2v': case 'mkv': case 'rmvb': case 'wmv': case 'avi': case 'flv': case 'mov': case 'm4v':
			return require('../assets/svg/video.svg')
			break;
	}
}
