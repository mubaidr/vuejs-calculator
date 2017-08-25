var myApp = new Vue({
  el: '#calculator',
  data: {
    btns: ['AC', 'CE', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.']
  },
  computed: {},
  methods: {
    handleClick (btn) {
      console.log(btn)
    }
  },
  created () {}
})
