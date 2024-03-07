// dom elements

const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");
const checkboxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const productsWrapper = document.getElementById("products-wrapper");

// init cart item count

let cartItemCount = 0;

//  init product element array

const productsElement = [];

// event listener for filtering

// loop over products and create elements
const createProductElement = (item) => {
  const productElement = document.createElement("div");

  productElement.className = "item space-y-2";

  productElement.innerHTML = `<div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
  <img src="${item.url}" class="w-full h-full object-cover" alt="${item.name}">
  <button
    class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add
    To
    Cart</button>
</div>
<p class="text-xl">${item.name}</p>
<strong>$${item.price}</strong>`;

  productElement.querySelector(".status").addEventListener("click", updateCart);

  return productElement;
};

const updateCart = (el) => {
  const wichButton = el.target;

  if (wichButton.classList.contains("remove")) {
    wichButton.classList.remove("remove");
    wichButton.classList.remove("bg-red-600");
    wichButton.classList.add("bg-gray-800");
    wichButton.innerText = "Add Tocart";
    cartItemCount--;
  } else {
    wichButton.classList.add("remove");
    wichButton.classList.remove("bg-gray-800");
    wichButton.classList.add("bg-red-600");
    wichButton.innerText = "Remove From Cart";
    cartItemCount++;
  }

  cartCount.innerText = cartItemCount;
};

products.forEach((item) => {
  const productElement = createProductElement(item);
  productsElement.push(productElement);
  productsWrapper.appendChild(productElement);
});

const filterProducts = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  console.log(searchTerm);

  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  productsElement.forEach((productElement, index) => {
    const product = products[index];

    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);

    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
  });
};

searchInput.addEventListener("input", filterProducts);
filtersContainer.addEventListener("change", filterProducts);
