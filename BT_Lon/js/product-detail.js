document.addEventListener('DOMContentLoaded', function() {
    // Lấy productId từ localStorage hoặc URL
    const productId = localStorage.getItem('selectedProductId');
    
    // Giả sử bạn có biến products chứa tất cả sản phẩm
    // Trong thực tế, bạn có thể lấy từ API hoặc database
    const product = products.find(p => p.id === parseInt(productId));
    
    if (product) {
        document.getElementById('detail-img').src = product.img;
        document.getElementById('detail-name').textContent = product.name;
        document.getElementById('detail-price').textContent = product.price;
        document.getElementById('detail-old-price').textContent = product.oldPrice;
        document.getElementById('detail-discount').textContent = product.discount;
        document.getElementById('detail-rating').textContent = `${product.rating} ⭐`;
        document.getElementById('detail-sold').textContent = `Đã bán: ${product.sold}`;
        document.getElementById('detail-brand').textContent = product.brand;
        document.getElementById('detail-size').textContent = product.size;
        document.getElementById('detail-resolution').textContent = product.resolution;
        document.getElementById('detail-screen-type').textContent = product.screenType;
        document.getElementById('detail-os').textContent = product.os;
        document.getElementById('detail-connectivity').textContent = product.connectivity;

        const featuresList = document.getElementById('detail-features');
        featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    } else {
        // Xử lý khi không tìm thấy sản phẩm
        document.querySelector('.product-detail-container').innerHTML = `
            <div class="not-found">
                <h2>Sản phẩm không tồn tại</h2>
                <button onclick="window.history.back()">Quay lại</button>
            </div>
        `;
    }
});