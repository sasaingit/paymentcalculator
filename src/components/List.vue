<template>
  <div class="lenders">
    <h3>Lenders</h3>
    <div class="card">
      <div class="card-header">
        Add a new lender
      </div>
      <div class="card-body">
        <form
          class="form-inline"
          @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <label>Reference</label>
            <input
              v-model="itemData.item_id"
              type="number"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            >
          </div>
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="itemData.item_name"
              type="text"
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
        Lender List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Lender Ref#
                </th>
                <th>Lender Name</th>
                <th class="text-right" />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in getAllItems"
                :key="item.id"
              >
                <template v-if="editId == item.id">
                  <td>
                    <input
                      v-model="editItemData.item_id"
                      type="number"
                    >
                  </td>
                  <td>
                    <input
                      v-model="editItemData.item_name"
                      type="text"
                    >
                  </td>
                  <td class="text-right">
                    <span
                      class="icon save"
                      title="Save"
                    >
                      <i
                        @click="onEditSubmit(item.id)"
                        class="fa fa-check"
                      />
                    </span>
                    <span
                      class="icon cancel"
                      title="Cancel"
                    >
                      <i
                        @click="onCancel"
                        class="fa fa-ban"
                      />
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{ item.item_id }}
                  </td>
                  <td>
                    {{ item.item_name }}
                  </td>
                  <td class="text-right">
                    <a
                      href="#"
                      class="icon"
                      title="Edit Lender"
                    >
                      <i
                        @click="onEdit(item)"
                        class="fa fa-pencil"
                      />
                    </a>
                    <a
                      href="#"
                      class="icon"
                      title="Delete Lender"
                    >
                      <i
                        @click="onDelete(item.id)"
                        class="fa fa-trash"
                      />
                    </a>
                    <router-link
                      :to="{
                        name: 'Rules',
                        params: { id: item.id },
                      }"
                      class="icon"
                      title="Manage Rules"
                    >
                      <i
                        class="fa fa-eye"
                      />
                    </router-link>
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
import { mapGetters, mapActions } from "vuex";
import crudMixin from "../mixins/crudMixin";

export default {
  name: "List",
  mixins: [crudMixin],
  data() {
    return {
      itemData: {
        item_id: "",
        item_name: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getAllItems: "getAllLenders",
      getItem: "getLender",
    }),
  },
  methods: {
    ...mapActions({
      addItem: "addLender",
      updateItem: "updateLender",
      deleteItem: "deleteLender",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: left;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  margin-left: 0.5rem;
  font-weight: 300;
}
.icon {
  margin-right: 10px;
}
.icon i {
  cursor: pointer;
}
body {
  background-color: #f3f3f3 !important;
}
input.form-control {
  border: 1px solid #ccc;
}
</style>
