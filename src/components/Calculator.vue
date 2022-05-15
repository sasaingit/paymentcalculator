<template>
  <div class="card-body">
    <form class="form">
      <div class="form-group">
        <input
          class="form-control ml-sm-2 mr-sm-4 my-2"
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          v-model="loanAmount"
        />
      </div>

      <div class="form-group">
        <input
          class="form-control ml-sm-2 mr-sm-4 my-2"
          type="number"
          placeholder="Term months"
          v-model="terms"
        />
      </div>

      <div class="form-group">
        <v-select
          :options="localLenders"
          v-model="selectedLenderId"
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

import ruleTypes from "../rules_types"
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);
import { mapGetters } from "vuex";

export default {
  name: "Calculator",
  data() {
    return {
      selectedLenderId: null,
      loanAmount: null,
      terms: null
    };
  },
  methods: {
    calculate() {
      if (!this.selectedLenderId) {
        return 0;
      }
      let inputParams = {
        loan_amount: parseFloat(this.loanAmount),
        terms: parseInt(this.terms),
        total_payble: 0,
      }
      const selectedLender = this.getLender(this.selectedLenderId.code)

      const input = selectedLender.rules.reduce((input, rule) => {
          input.input_value = rule.input_value
          const ruleMethod = ruleTypes[rule.rule_type.label].ruleMethod
          input.total_payble = ruleMethod(input)
          return input
      }, inputParams)

      console.log(input)
    },
  },
  computed: {
    ...mapGetters({
      lenders: "getAllLenders",
      getLender: "getLender",
    }),
    localLenders() {
      return this.lenders.map((item) => {
        return { label: item.item_name, code: item.id };
      });
    },
    defaultLender() {
      return this.localLenders[0];
    },
  },
}
</script>
