<template>
  <div class="card-body">
    <div
      class="row my-5  justify-content-center"
    >
      <form
        class="
      form col-md-8"
      >
        <div class="form-group">
          <input
            class="form-control ml-sm-2 mr-sm-4 my-2"
            type="number"
            placeholder="Amount"
            step="0.01"
            v-model="loanAmount"
          >
        </div>

        <div class="form-group">
          <input
            class="form-control ml-sm-2 mr-sm-4 my-2"
            type="number"
            placeholder="Term Months"
            v-model="terms"
          >
        </div>

        <div class="form-group">
          <v-select
            :options="lenders"
            v-model="selectedLenderId"
            placeholder="Select Lender"
            class="form-control ml-sm-2 mr-sm-4 my-2"
          />
        </div>

        <div class="form-group text-right my-3">
          <button
            class="btn btn-primary my-2"
            type="button"
            @click="calculate"
          >
            Calculate
          </button>
        </div>

        <div class="form-group">
          <h3>Estimated Monthly Payment</h3>
          <h1>$ {{ this.estimatedMonthlyPayment }}</h1>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ruleTypes from "../rules_types";
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
      terms: null,
      estimatedMonthlyPayment: '-'
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
      };
      const selectedLender = this.getLender(this.selectedLenderId.code);

      const input = selectedLender.rules.reduce((input, rule) => {
        input.input_value = rule.input_value;
        const ruleMethod = ruleTypes[rule.rule_type.label].ruleMethod;
        input.total_payble = ruleMethod(input);
        return input;
      }, inputParams);

      this.estimatedMonthlyPayment = input.total_payble
    },
  },
  computed: {
    ...mapGetters({
      allLenders: "getAllLenders",
      getLender: "getLender",
    }),
    lenders() {
      return this.allLenders.map((item) => {
        return { label: item.item_name, code: item.id };
      });
    },
  },
};
</script>

<style scoped>
.form-group h1{
  color: #7100da !important;
}
</style>
