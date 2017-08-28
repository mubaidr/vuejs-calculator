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
    expression: '4+2x10/5-4'
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
     * @descriptionInsert digits into experssion
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
            let li = this.expression.lastIndexOf(this.getNumberFromExp(this.expression, false))
            this.expression = this.expression.slice(0, li - len)
          }
          break
        case 'CLR':
          this.expression = this.expression.slice(0, -1)
          break
        case '+/-':
          this.result *= -1
          break
        case '=':
          let tmpExp = this.expression

          this.operators.split('').forEach(operator => {
            let parts = tmpExp.split(new RegExp('[' + operator + ']', 'gi'))

            let len = parts.length
            let first
            let last
            let resExp = ''
            let res = 0

            if (len > 1) {
              parts.forEach((part, index) => {
                if (index === 0) {
                  last = this.getNumberFromExp(part, false)
                  part = part.substr(0, part.length - last.toString().length)
                } else if (index === len - 1) {
                  first = this.getNumberFromExp(part, true)
                  part = part.substr(first.toString().length)
                } else {
                  first = this.getNumberFromExp(part, true)
                  last = this.getNumberFromExp(part, false)
                  part = part.substr(first.toString().length)
                  part = part.substr(0, part.length - last.toString().length)
                }

                if (first && last) {
                  switch (operator) {
                    case 'x':
                      res = last * first
                      break
                    case '/':
                      res = last / first
                      break
                    case '+':
                      res = last + first
                      break
                    case '-':
                      res = last - first
                      break
                  }
                }

                resExp += res.toString() + part

                console.log(resExp)
              })

              tmpExp = resExp
            }
          })

          this.result = parseFloat(tmpExp, 10)
      }
    },
    /**
     * @description Get last or first number from a given expression
     * @param {string} exp Expression
     * @param {boolean} first First (true) or Last (false) number in expression
     */
    getNumberFromExp (exp, first) {
      // eslint-disable-next-line
      let numbers = exp.split(/[x/\+-]/gi)
      if (first) {
        return parseFloat(numbers.shift(), 10)
      } else {
        return parseFloat(numbers.pop(), 10)
      }
    }
  }
})
