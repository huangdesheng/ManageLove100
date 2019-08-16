import {
  removeToken,
  removeUserName,
  removeMenus
} from "@/utils/authority.js";
export default {
  created() {
    let a = this.$store.state.menusLists.indexOf(this.$route.meta.id)
    // let b = this.$store.state.menusLists.indexOf(`'${this.$route.meta.id}'`)


    if (a == -1) {
      this.$router.replace("/");
    }
  },

  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  }

}
