// eslint-disable-next-line
var myApp = new Vue({
  el: '#calculator',
  data: {
    digits: '7894561230.',
    operators: 'x/+-',
    lastChar: '',
    char: '',
    result: 0,
    expression: ''
  },
  created () {},
  watch: {},
  computed: {},
  methods: {
    handleClick (e) {
      this.lastChar = this.char
      this.char = e.target.innerHTML
      if (this.digits.indexOf(this.char) > -1) {
        this.handleDigit()
      } else if (this.operators.indexOf(this.char) > -1) {
        this.handleOperator()
      } else {
        this.handleFunction()
      }
    },
    handleDigit () {
      if (this.char !== '.') {
        this.expression += this.char
      } else if (this.expression.indexOf(this.char) === -1) {
        this.expression += this.char
      }
    },
    handleOperator () {
      if (this.operators.indexOf(this.lastChar) > -1) {
        this.expression = this.expression.slice(0, -1)
      }
      this.expression += this.char
    },
    handleFunction () {
      switch (this.char) {
        case 'CE':
          this.expression = ''
          break
        case 'C':
          let len = this.expression.length
          if (this.operators.indexOf(this.expression[len - 1]) > -1) {
            this.expression = this.expression.slice(0, -1)
          } else {
            // eslint-disable-next-line
						var li = this.expression.lastIndexOf(this.expression.split(/[x/\+-]/gi).pop())
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
          // Calculate result
          break
      }
    }
  }
})
