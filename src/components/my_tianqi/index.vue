<template>
  <div id="weather-v2-plugin-standard" class="tianqi"></div>
</template>

<script>
export default {
  created() {
    window.WIDGET = {
      CONFIG: {
        layout: 1,
        width: "400",
        height: "150",
        background: 1,
        dataColor: "FFFFFF",
        aqiColor: "FFFFFF",
        borderRadius: 5,
        key: "KqMggC3ENd",
      },
    };
    (function (d) {
      var c = d.createElement("link");
      c.rel = "stylesheet";
      c.href =
        "https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0";
      var s = d.createElement("script");
      s.src =
        "https://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0";
      var sn = d.getElementsByTagName("script")[0];
      sn.parentNode.insertBefore(c, sn);
      sn.parentNode.insertBefore(s, sn);
    })(document);
  },
};
</script>

<style>
#weather-v2-plugin-standard {
  box-shadow: 0px 0px 4px 2px rgba(18, 18, 3, 0.2);
}
.wv-lt-col-5 {
  transform: scale(0);
}
.wv-n-h-now-rain {
  transform: scale(0);
}
</style>