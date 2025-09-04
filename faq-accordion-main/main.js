// Lấy tất cả các phần tử .qa
document.querySelectorAll(".qa").forEach(item => {
  item.addEventListener("click", () => {
    var answer = item.querySelector(".answer");
    var question = item.querySelector(".question");
    var icon = question.querySelector(".icon")
    // Toggle ẩn/hiện
    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  });
});

