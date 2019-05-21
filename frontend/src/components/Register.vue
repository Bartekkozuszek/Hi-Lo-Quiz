<template>
    <div class="layout-form">
        <div class="form-group" :class="{error: validation.hasError('email')}">
            <div class="label">* Email</div>
            <div class="content"><input type="text" class="form-control" v-model="email" /></div>
            <div class="message">{{ validation.firstError('email') }}</div>
        </div>
        
        <div class="form-group" :class="{error: validation.hasError('password')}">
            <div class="label">* Password</div>
            <div class="content"><input type="password" class="form-control" v-model="password" /></div>
            <div class="message">{{ validation.firstError('password') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('repeat')}">
            <div class="label">* Repeat</div>
            <div class="content"><input type="password" class="form-control" v-model="repeat" /></div>
            <div class="message">{{ validation.firstError('repeat') }}</div>
        </div>
        <div class="form-group">
            <div class="actions">
                <button type="button" class="btn btn-primary" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleVueValidator from 'simple-vue-validator';
    const Validator = SimpleVueValidator.Validator;

    export default {
        name: 'Register',
        mixins: [SimpleVueValidator.mixin],
        data: function () {
      return {
          email: '',
          password: '',
        repeat: '',
        submitted: false
      };
    },
    validators: {
      email: function (value) {
        return Validator.value(value).required().email();
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
        submit: function () {
            this.submitted = true;
        this.$validate()
          .then(function (success) {
            if (success) {
              alert('Validation succeeded!');
            }
          });
      }
    }
    }
</script>

<style>
    .form-control{
        border-radius: 4px;
    }

    .message {
        color: red;
    }
</style>