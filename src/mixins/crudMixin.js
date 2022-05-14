import { v4 as uuidv4 } from "uuid"

export default {
    data() {
        return {
            editId: '',
            editItemData: {
                ...this.itemData
            }
        }
    },
    methods: {
        onSubmit() {
            this.addItem({
                ...this.itemData,
                id: uuidv4(),
            })
            this.resetData(this.itemData)
        },
        onDelete(id) {
            id
        },
        onEdit(item) {
            this.editId = item.id
            this.editItemData = Object.assign({}, this.editItemData, {
                ...item
            })
        },
        onCancel() {
            this.editId = ''
            this.resetData(this.editItemData)
        },
        onEditSubmit(id) {
            const updatedItem = Object.assign({}, this.getItem(id), {
                ...this.editItemData
            })
            this.updateItem(updatedItem)

            this.editId = ''
            this.resetData(this.editItemData)
        },
        resetData(item) {
            Object.keys(item).forEach((i) => item[i] = '');
        }
    }
}