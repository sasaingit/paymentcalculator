<template>
  <div class="lenders">
    <h3 class="text-left">
      Manage rules for lender: {{ this.lender.item_name }}
    </h3>
    <div class="card">
      <div class="card-header">
        Add a new rule
      </div>
      <div class="card-body">
        <form
          class="form-inline"
          @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <label>Order</label>
            <input
              v-model="itemData.order"
              type="number"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            >
          </div>
          <div class="form-group">
            <label>Type</label>
            <v-select
              :options="ruleOptions()"
              v-model="itemData.rule_type"
              placeholder="select"
              class="form-control ml-sm-2 mr-sm-4 my-2 dropdown"
            />
          </div>
          <div class="form-group">
            <label>Input Value</label>
            <input
              v-model="itemData.input_value"
              type="number"
              step="0.0001"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            >
          </div>
          <div class="ml-auto text-right">
            <button
              type="submit"
              class="btn btn-primary my-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            Applied rules
          </div>
          <div class="col-md-6 text-right">
            <router-link
              :to="'/list'"
              class="btn btn-outline-primary"
            >
              Go Back
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Rule order
                </th>
                <th>Rule type</th>
                <th>Rule input</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in lender.rules"
                :key="item.id"
              >
                <template v-if="editId == item.id">
                  <td>
                    <input
                      v-model="editItemData.order"
                      type="number"
                    >
                  </td>
                  <td>
                    <v-select
                      :options="ruleOptions()"
                      v-model="editItemData.rule_type"
                      placeholder="select"
                    />
                  </td>
                  <td>
                    <input
                      v-model="editItemData.input_value"
                      type="number"
                      step="0.0001"
                    >
                  </td>
                  <td class="text-right">
                    <span
                      class="icon"
                      title="Submit"
                    >
                      <i
                        @click="onEditSubmit(item.id)"
                        class="fa fa-check"
                      />
                    </span>
                    <span class="icon">
                      <i
                        @click="onCancel"
                        class="fa fa-ban"
                        title="Cancel"
                      />
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{ item.order }}
                  </td>
                  <td>
                    {{ item.rule_type.label }}
                  </td>
                  <td>
                    {{ item.input_value }}
                  </td>
                  <td class="text-right">
                    <a
                      href="#"
                      class="icon"
                      title="Edit"
                    >
                      <i
                        @click="onEdit(item)"
                        class="fa fa-pencil"
                      />
                    </a>
                    <a
                      href="#"
                      class="icon"
                      title="Delete"
                    >
                      <i
                        @click="onDelete(item.id)"
                        class="fa fa-trash"
                      />
                    </a>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crudMixin from "../mixins/crudMixin";
import ruleTypes from "../rules_types";

import { mapGetters, mapActions } from "vuex";

import vSelect from "vue-select";
import Vue from "vue";

Vue.component("v-select", vSelect);

export default {
  name: "Rules",
  mixins: [crudMixin],
  data() {
    return {
      lender: null,
      itemData: {
        order: "",
        rule_type: "",
        input_value: ""
      },
    };
  },
  created() {
    this.lender = this.getLender(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      getLender: "getLender",
    }),
  },
  methods: {
    ...mapActions(["addLender", "updateLender"]),
    ruleOptions() {
      return Object.entries(ruleTypes).map((data, idx) => {
        const [, item] = data
        return {
          code: idx,
          label: item.ruleName
        }
      })
    },
    addItem(ruleObj) {
      if (!this.lender.rules) {
        this.lender.rules = [];
      }
      this.lender.rules.push(ruleObj);
      this.updateLender(this.lender);
    },
    updateItem(ruleObj) {
      const updatedRuleIdx = this.lender.rules.findIndex(
        (item) => item.id === ruleObj.id
      );
      this.lender.rules[updatedRuleIdx] = ruleObj;
      this.updateLender(this.lender);
    },
    getItem(id) {
      return this.lender.rules.find((item) => item.id === id);
    },
    deleteItem(id) {
      this.lender.rules = this.lender.rules.filter(item => item.id !== id)
      this.updateLender(this.lender);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: left;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 300;
  margin-top: 4rem;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
}
.icon {
  margin-right: 10px;
}
.icon i {
  cursor: pointer;
}
.v-select.form-control {
  border: 0px
}
.btn.btn-outline-primary{
  border-color: #7100da;
  color: #7100da;
  border-radius: 5rem;
}
.btn.btn-outline-primary:hover{
  background-color: #333;
  color: #FFF;
  border-color: #333;
 }
 .dropdown{
   min-width: 150px;
 }
</style>
