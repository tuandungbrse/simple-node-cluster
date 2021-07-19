function fibonacci(number) {
  if (number < 1) return 0
  if (number == 1) return 1
  return fibonacci(number - 1) + fibonacci(number - 2)
}

module.exports = fibonacci
