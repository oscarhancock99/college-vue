<template>
  <div>
    This is the Enrolments Index page

    <br>

    <button @click="getEnrolments()">Get Enrolments</button>

    <button @click="logout()">Logout</button>


    <router-link :to="{ name: 'enrolments_create'}">Create</router-link>
    <div class="search-box">
  <input type="text" v-model="term" />

  </div>

    <br><br>

    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(date)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{ data.item.date }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}">Edit</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentIndex',
  components: {
  },
  data() {
    return {
      fields: [
        {
          key: 'date',
          sortable: true,
        },
        'time',
        'status',
        {
          key: 'course_id',
          sortable: true,
        },
        {
          key: 'lecturer_id',
          sortable: true,
        },
        "Actions"
        ],

      enrolments: [],
      term: "",
      filterEnrolments: [],

    }
  },
  watch: {
  term: function(newTerm, oldTerm) {
  console.log('New: ', newTerm)
  console.log('Old: ', oldTerm)
  this.searchEnrolment();
  }
  },

  mounted(){
    this.getEnrolments();
  },


  methods: {
    searchEnrolment() {
this.filterEnrolments = this.enrolments.filter(enrolment =>{
if (enrolment.date.toLowerCase().includes(this.term.toLowerCase())) {
return true
}

 if (enrolment.time.toLowerCase().includes(this.term.toLowerCase())) {
return true
}
});
},
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },





    logout() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
