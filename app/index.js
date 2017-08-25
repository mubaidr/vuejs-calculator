var myApp = new Vue({
  el: '#calculator',
  data: {
    digits: '7894561230.',
    operators: '/x-+'
  },
  computed: {},
  methods: {
    handleClick (obj) {
      console.log(obj)
    }
  },
  created () {}
})
