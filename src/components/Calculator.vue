<template>
  <div class="card-body">
    <form class="form">
      <div class="form-group">
        <input
          class="form-control ml-sm-2 mr-sm-4 my-2"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
        />
      </div>

      <div class="form-group">
        <input
          class="form-control ml-sm-2 mr-sm-4 my-2"
          type="number"
          placeholder="Term months"
        />
      </div>

      <div class="form-group">
        <v-select
          :options="localLenders"
          v-model="selectedLender"
          placeholder="select"
          class="form-control ml-sm-2 mr-sm-4 my-2"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-primary my-2" type="button" @click="calculate">
          Calculate
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);
import { mapGetters } from "vuex";

export default {
  name: "Calculator",
  data() {
    return {
      selectedLender: null,
    };
  },
  methods: {
    calculate() {},
  },
  computed: {
    ...mapGetters({ lenders: "getAllLenders" }),
    localLenders() {
      return this.lenders.map((item) => {
        return { label: item.lender_name, code: item.id };
      });
    },
    defaultLender() {
      return this.localLenders[0];
    },
  },
};
</script>
