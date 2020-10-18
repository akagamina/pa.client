const url = "https://patrendyolapi.herokuapp.com/log"

class PerformanceManager {

  constructor() {
    this.analytics = new PerformanceAnalytics()
  }

  start() {
    window.addEventListener("unload", this.sendData)
  }

  sendData() {
    const data = new PerformanceAnalytics
    if (navigator.sendBeacon) return navigator.sendBeacon(url, JSON.stringify(data.getMetrics()))
    else fetch(url, { data: data.getMetrics(), method: 'POST', keepalive: true })
  }
}

class PerformanceAnalytics {

  getFCP() {
    return performance.getEntriesByName("first-contentful-paint")[0]?.startTime
  }

  getMetrics() {
    const { responseStart, requestStart, domComplete, responseEnd, unloadEventEnd } = performance.getEntriesByType("navigation")[0]

    return {
      fcp: this.getFCP(),
      ttfb: responseStart - requestStart,
      domLoad: domComplete,
      windowLoad: unloadEventEnd - responseEnd
    }
  }
}

const performanceManager = new PerformanceManager

performanceManager.start()







