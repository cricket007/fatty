<template>
  <div class="support-form">
    <div class="support-form-action">
      <div
        class="support-form-action-logo-wrap"
        @keydown.enter="toggleForm"
        @keydown.space="toggleForm"
        @click="toggleForm"
        aria-role="button"
        tabindex="0"
        :aria-pressed="showForm"
        aria-haspopup="support-form"
        :aria-expanded="showForm"
        aria-labelledby="exp_elem exp_button"
      >
        <slot />
      </div>

      <button
        class="sr-only"
        aria-label="click this button to support me in losing weight"
        @click="toggleForm"
        aria-haspopup="support-form"
        :aria-expanded="showForm"
        aria-labelledby="exp_elem exp_button"
        id="exp_button"
        :tabindex="showForm ? -1 : false"
      >
        Support Tim on his #roadtoamsterdam
      </button>

      <p v-show="!showForm" @click="toggleForm" class="support">
        Support me by <span>clicking</span> on my belly!
      </p>

      <div v-show="showForm" class="support-form-wrapper">
        <form
          id="support-form"
          name="support"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <label for="handle" id="exp_elem"
            >Please provide a Twitter handle</label
          >
          <button
            class="close-form"
            aria-label="click this button to close the form"
            @click.prevent="toggleForm"
          >
            +
          </button>

          <div class="support-form-field-wrapper">
            <div class="form-field handle">
              <input
                ref="handle"
                name="handle"
                type="text"
                id="handle"
                placeholder="@username"
                pattern="^@[A-Za-z0-9_]{1,15}$"
                @invalid="handleError"
                title="Only Twitter handles allowed"
                required
                value="@"
              />
            </div>
            <div class="form-field submit">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportForm",
  data() {
    return {
      showForm: false
    };
  },
  watch: {
    showForm() {
      if (this.show === false) {
        window.removeEventListener("keyup", this.onEscapeKeyUp);
      } else {
        window.addEventListener("keyup", this.onEscapeKeyUp);
        this.$nextTick(() => this.$refs.handle.focus());
      }
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    handleError(error) {
      error.target.classList.add("error");
    },
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.showForm = false;
      }
    }
  }
};
</script>

<style lang="scss">
.support-form {
  position: relative;
  width: rem(330px);
  margin: 0 auto;
  text-align: center;

  .support {
    position: absolute;
    top: rem(160px);
    left: 50%;
    width: rem(330px);
    height: auto;
    transform: translateX(-50%);
    cursor: pointer;

    span {
      color: #3590d5;
      text-decoration: underline;
    }

    &:hover {
      span {
        color: #c50d0d;
      }
    }
  }

  .support-form-wrapper {
    position: absolute;
    top: rem(160px);
    left: 50%;
    width: rem(330px);
    height: auto;
    background: #3590d5;
    padding: 1rem;
    transform: translateX(-50%);
    border-bottom: 2px solid #fff;
    box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.5);

    label {
      display: block;
      font-size: rem(14px);
      margin: rem(0 0 3px 0);
    }

    .close-form {
      position: absolute;
      right: 0;
      top: 0;
      width: 13px;
      background: none;
      border: none;
      color: #fff;
      font-weight: bold;
      font-size: rem(23px);
      transform: rotate(45deg);
      cursor: pointer;
      -webkit-appearance: none;
      transform-origin: center;
      height: rem(24px);
      width: rem(24px);
      line-height: 1;
      padding: 0;
      margin: 0;

      &:hover {
        color: #0c2235;
      }

      &:focus {
        outline: 1px solid #fff;
      }
    }

    .support-form-field-wrapper {
      display: flex;
      justify-content: center;
    }

    .handle input {
      width: rem(100%);
      line-height: 1;
      padding: rem(6px);
      background: #0c2235;
      border-bottom: solid #fff;
      border-width: 0 0 2px 0;
      font-family: $font;
      font-size: rem(17px);
      color: #fff;
      -webkit-appearance: none;
      border-radius: 0;

      &:focus {
        outline: none;
      }
    }

    .submit button {
      background: #c50d0d;
      border-bottom: solid #fff;
      border-width: 0 0 2px 0;
      font-family: $font;
      font-size: rem(14px);
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      height: rem(34.8px);
      cursor: pointer;
      -webkit-appearance: none;
      line-height: 1;
      padding: rem(0 8px);

      &:hover,
      &:focus {
        background: #0c2235;
      }
    }
  }
}

.support-form-action-logo-wrap {
  cursor: pointer;

  &:focus {
    outline: none;

    .logo-wrapper {
      outline: 1px solid #fff;
    }
  }
}

input.error {
  outline: none;
  border-color: 1px solid #c50d0d;

  &:valid {
    border-style: auto;
    border-color: inherit;
  }
}
</style>