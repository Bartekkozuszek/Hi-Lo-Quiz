<template>
    <div class="layout-form">
        <h2>Register</h2>
        <div class="form-group" :class="{error: validation.hasError('firstName')}">
            <div class="label">* First name</div>
            <div class="content"><input type="text" class="form-control" v-model="firstName" /></div>
            <div class="message">{{ validation.firstError('firstName') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('lastName')}">
            <div class="label">* Last name</div>
            <div class="content"><input type="text" class="form-control" v-model="lastName" /></div>
            <div class="message">{{ validation.firstError('lastName') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('userName')}">
            <div class="label">* Username</div>
            <div class="content"><input type="text" class="form-control" v-model="userName" /></div>
            <div class="message">{{ validation.firstError('userName') }}</div>
            <div v-if="registerError !== ''"> {{registerError}}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('password')}">
            <div class="label">* Password</div>
            <div class="content"><input type="password" class="form-control" v-model="password" /></div>
            <div class="message">{{ validation.firstError('password') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('repeat')}">
            <div class="label">* Repeat password</div>
            <div class="content"><input type="password" class="form-control" v-model="repeat" /></div>
            <div class="message">{{ validation.firstError('repeat') }}</div>
        </div>
        <div class="form-group">
            <div class="actions">
                <button type="button" @click="goBack">Cancel</button>
                <button type="button" class="btn btn-primary" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import SimpleVueValidator from 'simple-vue-validator';
    const Validator = SimpleVueValidator.Validator;

    export default {
        name: 'Register',
        mixins: [SimpleVueValidator.mixin],
        data: function () {
      return {
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          repeat: '',
          submitted: false,
          registerError: null,
          status: 0,
      };
    },
    validators: { //these validators validate each input field
        firstName: function (value) {
            return Validator.value(value).required().minLength(1).maxLength(50);
        },
        lastName: function (value) {
            return Validator.value(value).required().minLength(1).maxLength(50);
        },
        userName: function (value) {
                    var tempUserName = ''
                    return Validator.value(value).required().minLength(3).maxLength(15)
                        .custom(async function () {
                            if (!Validator.isEmpty(value)) {
                                var promise = await axios.get('http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/users')
                                 
                                for (var i = 0; i < promise.data.length; i++) {
                                    if (promise.data[i].userName === value) {
                                        return 'This username is already taken!'
                                    }
                                }

                            }
                        });
        },
        password: function (value) {
        return Validator.value(value).required().minLength(6);
      },
      'repeat, password': function (repeat, password) {
        if (this.submitted || this.validation.isTouched('repeat')) {
          return Validator.value(repeat).required().match(password);
        }
      }
    },
        methods: {
        goBack() {
                this.$router.push('/')
            },
        submit() {
            let isValid = false;
            this.submitted = true;
            this.$validate()
          .then(function (success) { //validates the form and displays appropriate message
              if (success) {
                  isValid= true;
              } 
          }).then(() => { //goes on with sending axios to submit to the db
            if (isValid) {
                 axios.post('http://testnode-env.8dhjre8pre.eu-central-1.elasticbeanstalk.com/api/v1/users', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    userName: this.userName,
                    password: this.password,
                    isAdmin: false

                }).then((resp) => {
                    this.$store.commit('login', resp.data)
                    this.registerError = ''
                    this.$router.push('/')

                }).catch((err) => {
                    this.registerError = err.response.data.msg
                })
            }
          });
            
            }
    }
    }
</script>

<style scoped>
    .form-control{
        border-radius: 4px;
        width: 60%;
        margin-left: 20%;
    }

    .form-group {

    }

    .message {
        color: red;
        font-weight: 600;
    }

    .layout-form{
        background: url(../../public/images/bg.jpg);
        background-position: center;
        background-size: 310vh;
        height: 100vh;
        font-family: 'Source Sans Pro', sans-serif;
        color: white;
        padding-top: 4%;

    }

    button{
        background-color: var(--themeColor2); /* Green */
        border: none;
        color: white;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 13px;
        margin: 4px 2px;
        cursor: pointer;
        min-width: 200px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin: 10px 0;
    }

    button:hover {
        background-color: #ce4010;
        transition: 0.4s;
    }

</style>