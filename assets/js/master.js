const testUrl =
	"https://dummyjson.com/products?limit=20&skip=10&select=title,price,images";
const product = [];

async function getApi(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`data ERROR : ${response.status}`);
		}
		const data = await response.json();
		product.push(...data.products);
	} catch (error) {
		console.log("error");
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

		const groups = [
			{
				items: product.slice(0, 8),
				container: "#product-cards",
				rowClass: ".part-card",
			},
			{
				items: product.slice(8, 12),
				container: "#product-cards-a",
				rowClass: ".part-card-a",
			},
			{
				items: product.slice(12, 20),
				container: "#product-cards-b",
				rowClass: ".part-card-b",
			},
		];

		groups.map((group) => {
			$(group.rowClass).html("");
			const row = $(group.rowClass);
			group.items.map((item) => {
				const col = $(createProductCard(item));
				$(row).append(col);
			});
			$(group.container).append(row);
		});
	} catch (e) {
		const div = $('<div class="loader"></div>');
		$(".listProduct").append(div);
	}
}

addToProduct();
