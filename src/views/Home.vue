<template>
  <div class="home">
    <input type="text" v-model="formData.title">
    <input type="text" v-model="formData.author">
    <input type="text" v-model="formData.summary">
    <input type="text" v-model="formData.image">
    
    <button @click="add">增加书籍</button>
    <div>
      <input type="text" v-model="bookId">
      <button @click="update">增加书籍</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      formData: {},
      bookId: ''
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      // this.$api.book.getBooks()
      //   .then(res => {
      //     console.log(res);
      //   });

      // this.$api.book.getBook(1)
      //   .then(res => {
      //     console.log(res);
      //   })
    },
    add() {
      this.$api.book.addBook(this.formData)
        .then(res => {
          console.log(res)
        })
    },
    update() {
      const params = {
        id: this.bookId,
        formData: this.formData
      }
      this.$api.book.updateBook(params)
        .then(res => {
          console.log(res)
        })
    }
  }
};
</script>
