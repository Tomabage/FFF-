const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const collection = localStorage.getItem("collection");
const collectionObject = JSON.parse(collection); // 把字符串变成对象
const hashMap = collectionObject || [
  { logo: "G", url: "https://github.com" },
  { logo: "D", url: "https://developer.mozilla.org" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
              <svg class="icon">
                  <use xlink:href="#icon-close"></use>
              </svg>
          </div>
      </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url, "_self");
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = prompt("请输入要添加的网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  // 点击add之后 hashMap添加一项
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), // 域名首字母大写
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); // 把一个对象变成字符串
  localStorage.setItem("collection", string);
};

$(document).on("keypress", (e) => {
  // const key = e.key
  const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
