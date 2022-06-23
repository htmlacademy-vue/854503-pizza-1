export default {
  methods: {
    $countChange(value, action) {
      this.$store.dispatch(action, {
        id: this.id,
        count: value,
        name: this.name,
      });
    },
  },
};
