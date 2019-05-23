<template>
  <div class="layout-form">
    <div
      class="form-group"
      :class="{ error: validation.hasError('firstName') }"
    >
      <div class="label">* First name</div>
      <div class="content">
        <input type="text" class="form-control" v-model="firstName" />
      </div>
      <div class="message">{{ validation.firstError("firstName") }}</div>
    </div>
    <div class="form-group" :class="{ error: validation.hasError('lastName') }">
      <div class="label">* Last name</div>
      <div class="content">
        <input type="text" class="form-control" v-model="lastName" />
      </div>
      <div class="message">{{ validation.firstError("lastName") }}</div>
    </div>
    <div class="form-group" :class="{ error: validation.hasError('userName') }">
      <div class="label">* Username</div>
      <div class="content">
        <input type="text" class="form-control" v-model="userName" />
      </div>
      <div class="message">{{ validation.firstError("userName") }}</div>
      <div v-if="registerError !== ''">{{ registerError }}</div>
    </div>
    <div class="form-group" :class="{ error: validation.hasError('password') }">
      <div class="label">* Password</div>
      <div class="content">
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="message">{{ validation.firstError("password") }}</div>
    </div>
    <div class="form-group" :class="{ error: validation.hasError('repeat') }">
      <div class="label">* Repeat password</div>
      <div class="content">
        <input type="password" class="form-control" v-model="repeat" />
      </div>
      <div class="message">{{ validation.firstError("repeat") }}</div>
    </div>
    <div class="form-group">
      <div class="actions">
        <button type="button" class="btn btn-primary" @click="submit">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;

export default {
  name: "Register",
  mixins: [SimpleVueValidator.mixin],
  data: function() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      repeat: "",
      submitted: false,
      registerError: null,
      status: 0
    };
  },
  validators: {
    firstName: function(value) {
      return Validator.value(value)
        .required()
        .minLength(1)
        .maxLength(50);
    },
    lastName: function(value) {
      return Validator.value(value)
        .required()
        .minLength(1)
        .maxLength(50);
    },
    userName: function(value) {
      return Validator.value(value)
        .required()
        .minLength(3)
        .maxLength(15);
    },
    password: function(value) {
      return Validator.value(value)
        .required()
        .minLength(6);
    },
    "repeat, password": function(repeat, password) {
      if (this.submitted || this.validation.isTouched("repeat")) {
        return Validator.value(repeat)
          .required()
          .match(password);
      }
    }
  },
  methods: {
    submit: function() {
      this.submitted = true;
      this.$validate().then(function(success) {
        if (success) {
          alert("Registration succeeded!");
        }
      });

      axios
        .post(
          "http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/users",
          {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            isAdmin: false
          }
        )
        .then(resp => {
          console.log("success");

          this.$store.commit("login", resp.data);
          this.registerError = "";
          console.log(resp.status);
        })
        .catch(err => {
          console.log("catch");
          this.registerError = err.response.data.msg;
        });
    },
    registerNewUser() {}
  }
};
</script>

<style>
.form-control {
  border-radius: 4px;
}

.message {
  color: red;
}
</style>
