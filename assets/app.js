(function () {
  function isHttpUrl(str) {
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  function buildIssueUrl(owner, repo, url) {
    const title = "Fetch resource request";
    const bodyLines = [
      "请求类型: fetch-request",
      "",
      "请为此 Issue 添加标签：fetch-request，以触发下载工作流。",
      "",
      "目标网址：",
      url
    ];
    const params = new URLSearchParams({
      title,
      body: bodyLines.join("\n")
      // 说明：无法通过 URL 直接设置 Issue 标签，需在 GitHub 页面手动添加。
    });
    return "https://github.com/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repo) + "/issues/new?" + params.toString();
  }

  const form = document.getElementById("issueForm");
  const ownerInput = document.getElementById("ownerInput");
  const repoInput = document.getElementById("repoInput");
  const urlInput = document.getElementById("urlInput");
  const issueLink = document.getElementById("issueLink");
  const msg = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.textContent = "";
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    const url = urlInput.value.trim();

    if (!owner || !repo) {
      msg.textContent = "请填写 owner 与 repo。";
      return;
    }
    if (!isHttpUrl(url)) {
      msg.textContent = "请输入有效的 http/https 网址。";
      return;
    }

    const link = buildIssueUrl(owner, repo, url);
    issueLink.href = link;
    issueLink.textContent = "跳转到新建 Issue";
    msg.textContent = "已生成 Issue 链接，请点击右侧按钮在 GitHub 上提交，并添加标签 fetch-request。";
  });
})();
