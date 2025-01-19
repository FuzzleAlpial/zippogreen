const BASE_URL = 'http://localhost:3000/zippo';

// Helper function to handle HTTP requests
async function handleRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

//Products
export async function getProducts() {
  const url = `${BASE_URL}/products`;
  return handleRequest(url);
}

export async function getBestsellerProducts() {
  const url = `${BASE_URL}/products/bestseller`;
  return handleRequest(url);
}


export async function getClassicsProducts() {
  const url = `${BASE_URL}/products/classics`;
  return handleRequest(url);
}

export async function getPremiumProducts() {
  const url = `${BASE_URL}/products/premium`;
  return handleRequest(url);
}

export async function getAsiaProducts() {
  const url = `${BASE_URL}/products/asia`;
  return handleRequest(url);
}

export async function getSlimProducts() {
  const url = `${BASE_URL}/products/slim`;
  return handleRequest(url);
}

export async function addProduct(product) {
  const url = `${BASE_URL}/products`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };
  return handleRequest(url, options);
}

//Remove product
export async function deleteProductByID(id) {
  const url = `${BASE_URL}/products/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return handleRequest(url, options);
}

//Update product
export async function updateProduct(product) {
  console.log(product);
  const url = `${BASE_URL}/products`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };
  return handleRequest(url, options);
}

//Order and payment
export async function getOrders() {
  const url = `${BASE_URL}/order`;
  return handleRequest(url);
}

export async function getOrderByID(id) {
  const url = `${BASE_URL}/order/${id}`;
  return handleRequest(url);
}

export async function getProductOrders() {
  const url = `${BASE_URL}/productOrder`;
  return handleRequest(url);
}

export async function addOrder(order) {
  const url = `${BASE_URL}/order`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  };
  return handleRequest(url, options);
}

export async function addProductOrder(productOrder) {
  const url = `${BASE_URL}/productOrder`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productOrder),
  };
  return handleRequest(url, options);
}

//Price Sort
export async function sortBestsellerProductsByPrice() {
  const url = `${BASE_URL}/products/bestseller/priceSort`;
  return handleRequest(url);
}

export async function sortClassicsProductsByPrice() {
  const url = `${BASE_URL}/products/classics/priceSort`;
  return handleRequest(url);
}

export async function sortPremiumProductsByPrice() {
  const url = `${BASE_URL}/products/premium/priceSort`;
  return handleRequest(url);
}

export async function sortAsiaProductsByPrice() {
  const url = `${BASE_URL}/products/asia/priceSort`;
  return handleRequest(url);
}

export async function sortSlimProductsByPrice() {
  const url = `${BASE_URL}/products/slim/priceSort`;
  return handleRequest(url);
}

//Descending price sort
export async function sortBestsellerProductsByPriceDesc() {
  const url = `${BASE_URL}/products/bestseller/descPriceSort`;
  return handleRequest(url);
}

export async function sortClassicsProductsByPriceDesc() {
  const url = `${BASE_URL}/products/classics/descPriceSort`;
  return handleRequest(url);
}

export async function sortPremiumProductsByPriceDesc() {
  const url = `${BASE_URL}/products/premium/descPriceSort`;
  return handleRequest(url);
}

export async function sortAsiaProductsByPriceDesc() {
  const url = `${BASE_URL}/products/asia/descPriceSort`;
  return handleRequest(url);
}

export async function sortSlimProductsByPriceDesc() {
  const url = `${BASE_URL}/products/slim/descPriceSort`;
  return handleRequest(url);
}

//Default sort
export async function sortBestsellerProductsByDefault() {
  const url = `${BASE_URL}/products/bestseller/defaultSort`;
  return handleRequest(url);
}

export async function sortClassicsProductsByDefault() {
  const url = `${BASE_URL}/products/classics/defaultSort`;
  return handleRequest(url);
}

export async function sortPremiumProductsByDefault() {
  const url = `${BASE_URL}/products/premium/defaultSort`;
  return handleRequest(url);
}

export async function sortAsiaProductsByDefault() {
  const url = `${BASE_URL}/products/asia/defaultSort`;
  return handleRequest(url);
}

export async function sortSlimProductsByDefault() {
  const url = `${BASE_URL}/products/slim/defaultSort`;
  return handleRequest(url);
}

//Login & Register
export async function authenticate(credential) {
  const url = `${BASE_URL}/authenticate`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, immutable'    
    },
    body: JSON.stringify(credential),
  };
  return handleRequest(url, options);
}

export async function addAccount(account) {
  const url = `${BASE_URL}/account`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  };
  return handleRequest(url, options);
}


