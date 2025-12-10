import { reactive } from "vue";

export const toast = reactive({
  message: "",
  type: "success",
  visible: false,

  show(msg, type = "success") {
    this.message = msg;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 2000);
  }
});
