// countdown timer
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);
function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector(".countdown-timer").innerHTML = "<p class='promo-ended'>KHUYẾN MÃI ĐÃ KẾT THÚC</p>";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Initialize sliders
$(document).ready(function () {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});

// Back to top button
window.addEventListener('scroll', function () {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

document.querySelector('.back-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// init
AOS.init({
    duration: 700,
    once: false
});
// active navbar
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath) {
            link.classList.add('active');
            navLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.remove('active');
                }
            });
        }
    });
});

// navbar scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Khi cuộn xuống 50px
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// search box
document.addEventListener('DOMContentLoaded', function() {
    const searchWrapper = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    let isActive = false;

    // Xử lý sự kiện
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Hàm tìm kiếm
    function performSearch() {
        if (!isActive) {
            searchWrapper.classList.add('active');
            searchInput.focus();
            isActive = true;
            return;
        }

        const keyword = searchInput.value.trim().toLowerCase();
        
        if (!keyword) {
            searchResults.innerHTML = "<p class='no-results'>Vui lòng nhập từ khóa tìm kiếm</p>";
            return;
        }

        searchResults.innerHTML = "<p class='loading'>Đang tìm kiếm...</p>";
        searchResults.style.display = "block"; // Hiện bảng kết quả tìm kiếm

        setTimeout(() => {
            const filteredProducts = products.filter(product => {
                // Tìm kiếm trong nhiều trường
                return (
                    product.name.toLowerCase().includes(keyword) ||
                    product.brand.toLowerCase().includes(keyword) ||
                    product.size.toLowerCase().includes(keyword) ||
                    product.resolution.toLowerCase().includes(keyword) ||
                    product.screenType.toLowerCase().includes(keyword) ||
                    product.features.some(feature => 
                        feature.toLowerCase().includes(keyword)
                    )
                );
            });
            displayResults(filteredProducts);
        }, 300);
    }

    // Hàm hiển thị kết quả
    function displayResults(results) {
        if (!results.length) {
            searchResults.innerHTML = ` 
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(product => `
            <div class="search-item" onclick="showProductDetail(${product.id})">
                <img src="${product.img}" alt="${product.name}" style="width: 40px; height: auto;">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="brand"><strong>Hãng:</strong> ${product.brand}</p>
                    <p class="specs">
                        <strong>Kích thước:</strong> ${product.size} | 
                        <strong>Độ phân giải:</strong> ${product.resolution}
                    </p>
                    <div class="price-section">
                        <span class="current-price">${product.price}</span>
                        ${product.oldPrice ? 
                            `<span class="old-price">${product.oldPrice}</span>` : ''}
                        ${product.discount ? 
                            `<span class="discount-badge">${product.discount}</span>` : ''}
                    </div>
                    <p class="rating">
                        <strong>Đánh giá:</strong> 
                        <span class="stars">${'⭐'.repeat(Math.floor(parseFloat(product.rating)))}</span> 
                        (${product.rating})
                    </p>
                    <p class="sold"><strong>Đã bán:</strong> ${product.sold}</p>
                    <div class="features">
                        <strong>Đặc điểm nổi bật:</strong>
                        <ul>
                            ${product.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Hàm để hiển thị chi tiết sản phẩm (nếu cần)
    function showProductDetail(id) {
        // Thêm mã hiển thị chi tiết sản phẩm ở đây (nếu cần)
    }

    // Đảm bảo kết quả tìm kiếm tự động ẩn khi người dùng click ra ngoài
    document.addEventListener('click', function(event) {
        if (!searchWrapper.contains(event.target) && !searchInput.contains(event.target)) {
            searchResults.style.display = "none";  // Ẩn kết quả tìm kiếm
            searchWrapper.classList.remove('active');  // Gỡ bỏ class active
            isActive = false;  // Đặt trạng thái lại là chưa active
        }
    });
});
