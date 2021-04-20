<template>



  <div>
<b-navbar toggleable="lg" type="light" variant="warning">
  <b-navbar-nav>

      <!-- <router-link to="/">Home</router-link> -->
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item :to="{name: 'lecturers_index'}">Lecturers</b-nav-item>
      <b-nav-item :to="{name: 'enrolments_index'}">Enrolments</b-nav-item>
      <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> -->
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
<script>
export default {
  name: "myNavbar",
props: {
  loggedIn: Boolean //<-- this is new line
},
logout() {
      localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
      this.$emit('logout'); //<-- tells App.vue to update loggedIn
      this.$router.push('/');
    }
}
</script>
<style>
.navbar {
  margin-bottom: 40px;
}
</style>
