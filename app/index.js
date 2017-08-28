// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#calculator',
  data: {
    digits: '7894561230.',
    operators: 'x/+-',
    lastChar: '',
    char: '',
    result: 0,
    expression: '2x2x2'
  },
  created () {},
  watch: {},
  computed: {},
  methods: {
    /**
     * @description Handles click event on digits, functions and operators
     * @param {any} e Click event
     */
    handleClick (e) {
      this.lastChar = this.char
      this.char = e.target.innerHTML
      if (this.digits.indexOf(this.char) > -1) {
        this.addDigit()
      } else if (this.operators.indexOf(this.char) > -1) {
        this.addOperator()
      } else {
        this.addFunction()
      }
    },
    /**
     * @description Insert digits into expression
     */
    addDigit () {
      if (this.char !== '.') {
        this.expression += this.char
      } else if (this.expression.indexOf(this.char) === -1) {
        this.expression += this.char
      }
    },
    /**
     * @description Insert operator into expression
     */
    addOperator () {
      if (this.expression.length === 0) return
      if (this.operators.indexOf(this.lastChar) > -1) {
        this.expression = this.expression.slice(0, -1)
      }
      this.expression += this.char
    },
    /**
     * @description Perform functions
     */
    addFunction () {
      switch (this.char) {
        case 'CE':
          this.expression = ''
          this.result = 0
          break
        case 'C':
          let len = this.expression.length
          if (this.operators.indexOf(this.expression[len - 1]) > -1) {
            this.expression = this.expression.slice(0, -1)
          } else {
            this.expression = this.getNumberFromExp(this.expression, false, true).expression
          }
          break
        case 'CLR':
          this.expression = this.expression.slice(0, -1)
          break
        case '+/-':
          this.result *= -1
          break
        case '=':
          if (this.lastChar && this.operators.indexOf(this.lastChar) > -1) {
            this.expression = this.expression.slice(0, -1)
          }
          this.calculateResult()
          break
      }
    },
    /**
     * @description Calculate result from the expression
     */
    calculateResult () {
      let copyOfExpression = this.expression
      let resultingExpresssion = ''

      this.operators.split('').forEach(operator => {
        if (operator !== 'x') return // DEBUG

        let parts = copyOfExpression.split(new RegExp('[' + operator + ']', 'g'))
        let numOfParts = parts.length
        if (numOfParts === 1) return

        let parsedData = this.getNumberFromExp(copyOfExpression, true, true)

        console.log(parsedData)

        for (var i = 0; i < parts.length - 1; i++) {
          switch (operator) {
            case 'x':
              break
            case '/':
              break
            case '+':
              break
            case '-':
              break
          }
        }
      })

      this.result = parseFloat(resultingExpresssion, 10)
    },
    /**
     * @description Get last or first number from a given expression
     * @param {string} exp Expression
     * @param {boolean} first First (true) or Last (false) number in expression
     * @param {boolean} remove Remove(true) or Retain(false) number in expression
     */
    getNumberFromExp (exp, first, remove) {
      let result = {}
      let numbers = exp.split(new RegExp('[' + this.operators + ']', 'g'))
      let number

      if (first) {
        number = numbers[0]
        if (remove) {
          result.expression = exp.substr(number.length)
        }
      } else {
        number = numbers[numbers.length - 1]
        if (remove) {
          result.expression = exp.substr(0, exp.length - number.length)
        }
      }
      result.number = parseFloat(number, 10)
      return result
    }
  }
})
