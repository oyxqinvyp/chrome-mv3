// 监听点击图标显示tab页
let tabId: any = null

chrome.action.onClicked.addListener(tab => {
  let main = chrome.runtime.getURL('index.html')
  if (tabId) {
    chrome.tabs.update(tabId, {
      selected: true
    })
  } else {
    chrome.tabs.create({
      url: main
    }, tab => {
      tabId = tab.id
    })
  }
})

// 监听删除tab清空插件页
chrome.tabs.onRemoved.addListener((tid) => {
  if (tabId === tid) {
    tabId = null
  }
})

// 创建分钟定时器
chrome.alarms.create('task-minutes', {
  periodInMinutes: 1,
  delayInMinutes: 1
})

// 监听定时器执行
chrome.alarms.onAlarm.addListener(alarmInfo => {
  if (alarmInfo.name === 'task-minutes') {
    // 每分钟执行一行
    let _now = new Date();
    let _Hours = _now.getHours();
    let _Minutes = _now.getMinutes();
    let _Day = _now.getDate();

    console.log(_Day, _Hours, _Minutes)
  }
})