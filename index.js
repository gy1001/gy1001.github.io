const { performance, PerformanceObserver } = require('perf_hooks')

const add = (a, b) => a + b

const num1 = 1
const num2 = 2

performance.mark('start')

for (let i = 0; i < 1000000; i++) {
  add(num1, num2)
}

// add(num1, 's') // 这里注意：类型发生变化！类型发生变化！类型发生变化！

for (let i = 0; i < 1000000; i++) {
  add(num1, num2)
}

performance.mark('end')

const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0])
})

observer.observe({ entryTypes: ['measure'] })
performance.measure('测量1', 'start', 'end')
