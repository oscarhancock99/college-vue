<template>


  <div class="home">

    This is the home page

    <br>

    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <b-button variant="success" @click="login()" >Login</b-button>



  </div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }

    }
  },

  methods: {

    login() {
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'courses_index' })
      })


      .catch(error => {

      console.log(error)

      console.log(error.response.data)
    })

    }

  },
}
</script>

<style>
.home {
  text-align: center;
}

</style>
