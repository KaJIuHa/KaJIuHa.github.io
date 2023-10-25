document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartContainer = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    const items = {}; // Создаем словарь для хранения выбора клиента

    let total = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product");
            const productName = productCard.querySelector("h2").textContent;
            const productPrice = parseFloat(productCard.querySelector(".price").textContent);

            const product = {
                name: productName,
                price: productPrice,
                quantity: 1,
                customerInfo: { // Добавляем информацию о клиенте внутри товара
                    name: "Имя",
                    surname: "Фамилия",
                    seat: "Место",
                    balcony: "Лоджия"
                }
            };

            items[productName] = product; // Сохраняем товар в словаре по имени

            // Обновляем отображение корзины (если необходимо)

            // Ваш код обновления корзины, если необходимо

            cartContainer.removeAttribute("hidden");
        });
    });

    // Функция для обновления отображения корзины (если необходимо)
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




Telegram.WebApp.onEvent('mainButtonClicked',callback, function(){
    tg.BackButton.show()
    tg.MainButton.setText('Перейти в корзину');
    cartContainer.removeAttribute("hidden");
    // tg.MainButton.setText('Перейти к оформлению');
    productShow.style.display = 'none';
    tg.sendData('Hi from bot')
});