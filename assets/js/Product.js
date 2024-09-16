const testUrl =
	"https://dummyjson.com/products?limit=32&skip=10&select=title,price,images";
const filter = $("#filter");
const product = [];
const listItem = [];

addToProduct();
$("#search").on("submit", (e) => {
	e.preventDefault();
});
filter.on("input", (e) => {
	filterSearch(e.target.value);
});

async function getApi(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`data ERROR : ${response.status}`);
		}
		const data = await response.json();
		product.push(...data.products);
	} catch (error) {
		console.log("Fetch error:", error);
	}
}

function createProductCard(item) {
	return `
        <div class="col-md-3 col-sm-6 py-3 py-md-0">
            <div class="card">
                <img src="${item.images[0]}" alt="" />
                <div class="card-body">
                    <h3 class="text-center">${item.title}</h3>
                    <p class="text-center">Lorem ipsum dolor sit amet.</p>
                    <div class="star text-center">
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                    </div>
                    <h2>
                        $${item.price}
                        <span><li class="fa-solid fa-cart-shopping"></li></span>
                    </h2>
                </div>
            </div>
        </div>
    `;
}

async function addToProduct() {
	try {
		await getApi(testUrl);
		$(".part-card").html("");
		const row = $(".part-card"); // Create the row container outside the loop
		product.map((item) => {
			const col = $(createProductCard(item));
			listItem.push(col);
			$(row).append(col);
		});
		$("#product-cards").append(row); // Append row only once after mapping
	} catch (e) {
		const div = $('<div class="loader"></div>');
		$(".listProduct").append(div);
	}
}

function filterSearch(searchTerm) {
	product.filter((item, index) => {
		const col = listItem[index];
		// Get the corresponding column element
		if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
			$(col).show();
		} else {
			$(col).hide();
		}
	});
}
