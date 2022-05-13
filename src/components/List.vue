<template>
  <div class="lenders">
    <h3>Lenders</h3>
    <div class="card">
      <div class="card-header">
        Add a new lender
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>ID</label>
            <input v-model="lenderData.lender_id" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input v-model="lenderData.lender_name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
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
                  Lender ID
                </th>
                <th>
                  Lender Name
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lender in getAllLenders" v-bind:key="lender.id">
                <template v-if="editId == lender.id">
                  <td><input v-model="editLenderData.lender_id" type="text"></td>
                  <td><input v-model="editLenderData.lender_name" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(lender.id)" class="fa fa-check">Submit</i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban">Cancel</i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{lender.lender_id}}
                  </td>
                  <td>
                    {{lender.lender_name}}
                  </td>
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(lender.id)" class="fa fa-trash">Delete</i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(lender)" class="fa fa-pencil">Edit</i>
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
import { mapGetters, mapActions } from "vuex"
import { v4 as uuidv4 } from "uuid"

export default {
  name: 'List',
  data () {
    return {
      editId: '',
      lenderData: {
        'id' : '',
        'lender_id': '',
        'lender_name': ''
      },
      editLenderData: {
        'id' : '',
        'lender_id': '',
        'lender_name': ''
      },
      lenders: []
    }
  },
  created() {
    this.getLenders()
  },
  computed: {
    ...mapGetters(['getAllLenders',
      'getLender'])
  },
  methods: {
    getLenders() {
      this.lenders = []
    },
    onSubmit(){
      this.addLender({
        id: uuidv4(),
        lender_id: this.lenderData.lender_id,
        lender_name: this.lenderData.lender_name,
      })
      this.lenderData.lender_id = ''
      this.lenderData.lender_name = ''
    },
    onDelete(id){
      id
    },
    onEdit(lender){
      this.editId = lender.id
      this.editLenderData.lender_id = lender.lender_id
      this.editLenderData.lender_name = lender.lender_name
    },
    onCancel(){
      this.editId = ''
      this.editLenderData.lender_id = ''
      this.editLenderData.lender_name = ''
    },
    onEditSubmit (id){
        const updatedLender = this.getLender(id);
        updatedLender.lender_id = this.editLenderData.lender_id
        updatedLender.lender_name = this.editLenderData.lender_name
        this.updateLender(updatedLender)
        
        this.editId = ''
        this.editLenderData.lender_id = ''
        this.editLenderData.lender_name = ''
        this.editLenderData.lender_price = ''
    },
    ...mapActions(['addLender','updateLender'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
</style>
