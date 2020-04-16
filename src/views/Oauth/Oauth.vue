<template>
  <div class="home"></div>
</template>
<script>
export default {
  name: "AuthStart",
  data() {
    return {
      ACCESS_TOKEN: "",
    };
  },
  created() {
    let hash = this.$route.query.hash;
    hash && localStorage.setItem("access_token", hash);
    this.oauthLogin();
  },
  methods: {
    oauthLogin() {
      this.ACCESS_TOKEN = localStorage.getItem("access_token");
      this.ACCESS_TOKEN ? this.checkAccessToken() : this.getAuth();
    },
    checkAccessToken() {
      this.$axios({
        url: "wts/auth/check",
        method: "post",
        withoutToken: true,
        data: {
          access_token: this.ACCESS_TOKEN,
        },
      }).then((res) => {
        if (res) {
          this.ACCESS_TOKEN = res["access_token"];
          localStorage.setItem("token", res["X-Access-Token"]);
          localStorage.setItem("access_token", res["hash"]);
          localStorage.setItem("no", res["campus_id"]);
          this.$router.replace({
            path: "/",
          });
        } else {
          this.getAuth();
        }
      });
    },
    getAuth() {
      const client_id = "15835907632325255";
      const scope = "get_user_info";
      const state = "login";
      const redirect_uri = `${process.env.URL}wts/auth/oauth_login`;
      let AUTH_URL = `https://api.campushoy.com/connect/oauth2/authorize?response_type=code&client_id=${client_id}&scope=${scope}&state=${state}&redirect_uri=${redirect_uri}`;
      window.location.href = AUTH_URL;
    },
  },
};
</script>
