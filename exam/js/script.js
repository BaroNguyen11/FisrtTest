// Tự động sao chép lại các logo khi chúng di chuyển hết ra ngoài.
document.addEventListener("DOMContentLoaded", function() {
  let scrollContent = document.getElementById("scrollContent");
  let images = Array.from(scrollContent.children);

  setInterval(() => {
    if (scrollContent.scrollLeft >= scrollContent.scrollWidth - scrollContent.clientWidth) {
      // Khi phần tử cuộn hết, sao chép lại các phần tử và thêm vào cuối
      images.forEach(img => {
        let clone = img.cloneNode(true);
        scrollContent.appendChild(clone);
      });
    }
  }, 100); // Kiểm tra 100ms một lần
});
