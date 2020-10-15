const url = "https://patrendyolapi.herokuapp.com/log"


class PerformanceAnalytics {

  constructor() {
    this.getFCP()
    this.getAnalytics()
  }

  getFCP() {
    const paintMetrics = performance.getEntriesByType("paint")
    paintMetrics.forEach(paintMetric => paintMetric.startTime)
  }

  getAnalytics() {
    const { responseStart, requestStart, domComplete, responseEnd, loadEventEnd } = performance.getEntriesByType("navigation")[0]
    return {
      fcp: this.getFCP() || 0,
      ttfb: responseStart - requestStart,
      domLoad: domComplete,
      windowLoad: loadEventEnd - responseEnd
    }

  }

  sendAnalytics() {
    window.addEventListener("unload", () => {
      try {
        if (navigator.sendBeacon) navigator.sendBeacon(url, JSON.stringify(this.getAnalytics()))
        else fetch(url, { data: this.getAnalytics(), method: 'POST', keepalive: true })
      } catch (error) {
        console.log('error: ', error)
      }
    })
  }
}


const analytics = new PerformanceAnalytics

console.log(analytics.getAnalytics())

window.addEventListener("load", analytics.sendAnalytics())






