document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartContainer = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    const items = {}; // Создаем словарь для хранения выбора пользователя
    let tg = window.Telegram.WebApp;

    tg.expand();

    let total = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product");
            const productName = productCard.querySelector("h2").textContent;
            const productPrice = parseFloat(productCard.querySelector(".price").textContent);

            if (items[productName]) {
                // Если товар уже выбран, увеличиваем количество
                items[productName].quantity++;
            } else {
                // Если товар впервые выбран, создаем новую запись
                items[productName] = {
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    customerInfo: {
                        name: "Имя",
                        surname: "Фамилия",
                        seat: "Место",
                        balcony: "Лоджия"
                    }
                };
            }

            total += productPrice;
            updateCartDisplay();
            // cartContainer.removeAttribute("hidden");
            tg.MainButton.setText('Перейти в корзину');
            tg.MainButton.show();

        });
    });

    function updateCartDisplay() {
        cartItems.innerHTML = "";

        for (const itemName in items) {
            const item = items[itemName];
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} x${item.quantity}: $${item.price * item.quantity}`;
            cartItems.appendChild(listItem);
        }

        totalPrice.textContent = total;
    }
});


Telegram.WebApp.onEvent('mainButtonClicked', function(){
    tg.sendData(item)
    tg.close()
    // tg.MainButton.setText('Перейти в корзину');
    // cartContainer.removeAttribute("hidden");
    // // tg.MainButton.setText('Перейти к оформлению');
    // productShow.style.display = 'none';
    // tg.sendData('Hi from bot')
});
