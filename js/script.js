document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartContainer = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const productShow = document.getElementById("products");
    const field1 = document.querySelector(".field1"); // Поле 1
    const field2 = document.querySelector(".field2"); // Поле 2
    const field3 = document.querySelector(".field3"); // Поле 3
    const field4 = document.querySelector(".field4"); // Поле 4

    let item = {}; // Изменение массива на словарь
    let total = 0;

    let tg = window.Telegram.WebApp;

    tg.expand();

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Скрыть кнопку "Добавить в корзину"
            button.style.display = "none";

            // Отобразить кнопки + и -, а также количество позиции в правом верхнем углу карточки
            const productCard = button.closest(".product");
            const quantityControls = productCard.querySelector(".quantity-controls");
            const incrementButton = quantityControls.querySelector(".increment");
            const decrementButton = quantityControls.querySelector(".decrement");
            const cartQuantity = productCard.querySelector(".cart-quantity");

            quantityControls.style.display = "flex";
            cartQuantity.textContent = "1";
            cartQuantity.classList.add("show");

            incrementButton.style.display = "inline";
            decrementButton.style.display = "inline";

            const productName = productCard.querySelector("h2").textContent;
            const productPrice = parseFloat(productCard.querySelector(".price").textContent);

            const product = {
                name: productName,
                price: productPrice,
                quantity: 1,
            };

            item[productName] = product; // Добавление товара в словарь item
            total += product.price;
            updateCartDisplay();
            tg.MainButton.setText('Перейти в корзину');
            tg.MainButton.show();

            // Обработка нажатия на кнопку плюс
            incrementButton.addEventListener("click", () => {
                product.quantity++;
                cartQuantity.textContent = product.quantity;
                total += product.price;
                updateCartItem(product);
            });

            // Обработка нажатия на кнопку минус
            decrementButton.addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity--;
                    cartQuantity.textContent = product.quantity;
                    total -= product.price;
                    updateCartItem(product);
                }
            });
        });
    });

    function updateCartDisplay() {
        cartItems.innerHTML = "";

        for (const productName in item) {
            const product = item[productName];
            const listItem = document.createElement("li");
            listItem.textContent = `${product.name} x${product.quantity}: $${product.price * product.quantity}`;
            cartItems.appendChild(listItem);
        }

        totalPrice.textContent = total;
    }

    function updateCartItem(product) {
        total -= product.price * (product.quantity - 1);
        total += product.price * product.quantity;
        updateCartDisplay();
    }

    Telegram.WebApp.onEvent('mainButtonClicked', function () {
        if (!field1.value || !field2.value || !field3.value || !field4.value) {
            alert("Поля для доставки обязательны для заполнения.");
            return;
        }
        const delivery = {
            field1: field1.value, // Получение значения поля 1
            field2: field2.value, // Получение значения поля 2
            field3: field3.value, // Получение значения поля 3
            field4: field4.value, // Получение значения поля 4
        }
        item[delivery] = delivery;
        productShow.style.display = 'none';
        tg.sendData(JSON.stringify(item));
    });
});
