<template>
  <div class="lenders">
    <h3>Manage rules for lender: {{ this.lender.item_name }}</h3>
    <div class="card">
      <div class="card-header">Add a new rule</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Order</label>
            <input
              v-model="itemData.order"
              type="number"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="form-group">
            <label>Type</label>
            <v-select
              :options="ruleOptions()"
              v-model="itemData.rule_type"
              placeholder="select"
              class="form-control ml-sm-2 mr-sm-4 my-2"
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
            />
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">Applied rules</div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Rule order</th>
                <th>Rule type</th>
                <th>Rule input</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in lender.rules" v-bind:key="item.id">
                <template v-if="editId == item.id">
                  <td><input v-model="editItemData.order" type="number" /></td>
                  <td>
                    <v-select
                      :options="ruleOptions()"
                      v-model="editItemData.rule_type"
                      placeholder="select"
                    />
                  </td>
                  <td>
                    <input v-model="editItemData.input_value" type="number" step="0.0001"/>
                  </td>
                  <td>
                    <span class="icon">
                      <i @click="onEditSubmit(item.id)" class="fa fa-check"
                        >Submit</i
                      >
                    </span>
                    <span class="icon">
                      <i @click="onCancel" class="fa fa-ban">Cancel</i>
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
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(item.id)" class="fa fa-trash"
                        >Delete</i
                      >
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(item)" class="fa fa-pencil">Edit</i>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon {
  margin-right: 10px;
}
.icon i {
  cursor: pointer;
}
</style>
