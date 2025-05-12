function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
      <div class="product-card" onclick="showProductDetail(${product.id})">
          <div class="product-image">
              <img src="${product.img}" alt="${product.name}">
          </div>
          <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="product-price d-flex gap-4">
                  <div class="d-flex flex-column ">
                  <span class="current-price">${product.price}</span>
                  <span class="old-price m-0">${product.oldPrice}</span>
                  </div>
                  <span class="discount">${product.discount}</span>
              </div>
              <div class="product-meta">
                  <span class="rating">${product.rating} ⭐</span>
                  <span>Đã bán: ${product.sold}</span>
              </div>
          </div>
      </div>
  `).join('');
}
// details
function showProductDetail(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-detail.html';
}


function backToList() {
    document.getElementById('product-list').style.display = 'flex';
    document.getElementById('product-detail').style.display = 'none';
    document.getElementById('btn-show').style.display = 'inline-block';
}

document.addEventListener("DOMContentLoaded", () => {
    renderProductList();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if (productId) {
        showProductDetail(productId);
    }
});
// slider
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
