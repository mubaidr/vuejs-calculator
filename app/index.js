// eslint-disable-next-line
var myApp = new Vue({
  el: '#calculator',
  data: {
    digits: '7894561230.',
    operators: '/x-+',
    history: [],
    lastChar: '',
    resullt: 0,
    expression: ''
  },
  created () {},
  watch: {},
  computed: {},
  methods: {
    handleClick (e) {
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
    handleOperator () {},
    handleFunction () {
      switch (this.char) {
        case 'AC':
          this.expression = ''
          break
        case 'CE':
          this.expression = this.expression.slice(0, -1)
          break
        case 'M':
          this.history.push(this.expression)
          this.expression = ''
          break
        case '+/-':
          this.resullt *= -1
          break
        case '=':
          this.resullt = 99
          break
      }
    }
  }
})
