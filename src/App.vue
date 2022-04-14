<template>
  <loading :active="isLoading"></loading>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white bg-opacity-75 py-0">
      <div class="container border-bottom py-3 flex-wrap">
          <router-link to="/" class="navbar-brand text-uppercase">
            <span class="badge bg-primary">Covid-19</span>
            台灣疫情地圖
          </router-link>
          <div class="ms-auto d-flex navLinkBox">
            <router-link to="/" class="nav-link">疫情一覽</router-link> |
            <router-link to="/chart" class="nav-link">確診統計圖</router-link> |
            <router-link to="/city" class="nav-link">縣市案例</router-link>
          </div>
      </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
  <footer>
    <div class="container border-top py-3 text-center">
      <p>聲明：本作品僅為做 Vue 練習使用，無任何商業意義 | 資料內容非即時更新</p>
      <p class="text-muted">
        資料來源：<a href="https://www.cdc.gov.tw/" target="_blank">衛福部疾管署</a><br>
        畫面資料：<a href="https://covid-19.nchc.org.tw/city_confirmed.php" target="_blank">COVID-19全球疫情地圖</a> |
        <a href="https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001&limited=%E5%85%A8%E9%83%A8%E7%B8%A3%E5%B8%82" target="_blank">Json 檔案下載</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "./assets/helpers/variables";
@import "~bootstrap/scss/bootstrap";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&family=Open+Sans:wght@400;700&display=swap');

#app {
  font-family: 'Open Sans', 'Noto Sans TC', sans-serif;
}
nav {
  .nav-link {
    position: relative;
    padding: 0 10px;
    color: $dark;
    text-decoration: none;
    &.router-link-exact-active {
      color: $primary;
    }
  }
}
::selection {
  background: $primary;
  color: $white;
}
::-moz-selection {
  background: $primary;
  color: $white;
}
</style>
