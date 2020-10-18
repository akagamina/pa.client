const url = "https://localhost:3000/log"

class PerformanceManager {

  constructor(performanceAnalytics) {
    this.performance = performanceAnalytics
    console.log('this.performance: ', this.performance)
  }

  start() {
    window.addEventListener("unload", this.sendData)
  }

  sendData() {
    const data = this.performance.getMetrics
    if (navigator.sendBeacon) navigator.sendBeacon(url, JSON.stringify(data))
    else fetch(url, { data, method: 'POST', keepalive: true })
  }
}

class PerformanceAnalytics {

  getFCP() {
    return performance.getEntriesByName("first-contentful-paint")[0].startTime
  }

  getMetrics() {
    const { responseStart, requestStart, domComplete, responseEnd, unloadEventEnd } = performance.getEntriesByType("navigation")[0]
    console.log('responseStart: ', responseStart)
    return {
      fcp: this.getFCP(),
      ttfb: responseStart - requestStart,
      domLoad: domComplete,
      windowLoad: unloadEventEnd - responseEnd
    }
  }
}

const performanceManager = new PerformanceManager()

performanceManager.start()







