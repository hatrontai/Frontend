// Lấy tất cả các phần tử .qa
document.querySelectorAll(".qa").forEach(item => {
  item.addEventListener("click", () => {
    var answer = item.querySelector(".answer");
    var question = item.querySelector(".question");
    var icon = question.querySelector(".icon")
    // Toggle ẩn/hiện
    if (answer.style.display === "block") {
      answer.style.display = "none";
      icon.style.backgroundImage = 'url(./assets/images/icon-plus.svg)';
    } else {
      answer.style.display = "block";
      icon.style.backgroundImage = 'url(./assets/images/icon-minus.svg)';
    }
  });
});

