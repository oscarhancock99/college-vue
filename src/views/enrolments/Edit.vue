<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Enrolment date:"
        label-for="input-1"
        status="Your status will be kept private."
      >
        <b-form-input
          id="input-1"
          v-model="enrolment.date"
          type="text"
          placeholder="Enter date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Enrolment time:"
        label-for="input-1"
        status="secret"
      >
        <b-form-input
          id="input-1"
          v-model="enrolment.time"
          type="text"
          placeholder="Enter time"
          required
        ></b-form-input>
      </b-form-group>




      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        enrolment: {
          date: '',

        },

        show: true
      }
    },
    created() {
      this.getEnrolment();
    },
    methods: {
      getEnrolment() {
        let token = localStorage.getItem('token');
        let id = this.$route.params.id;

        axios.get('https://college-vue-oscar.web.app/api/enrolments' + id,  {
          headers: { Authorization: "Bearer " + token}
        })
        .then(response => {
          console.log(response.data);
          this.enrolment = response.data.data;

        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
      },
      onSubmit(event) {
        let id = this.$route.params.id;
let token = localStorage.getItem('token');
        event.preventDefault()
        axios.put('http://college.api:8000/api/enrolments' + id, {
          date: this.enrolment.date,
          time: this.enrolment.time,
          status: this.enrolment.status,
          course_id: this.enrolment.course_id,
          lecturer_id: this.enrolment.lecturer_id,
        },
        {
          headers: { Authorization: "Bearer " + token}
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'courses_index' });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
