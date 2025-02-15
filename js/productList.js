const token = localStorage.getItem("token");
const productList = document.getElementById("productList");

// (async function fetchProductList() {
//   try {
//     const response = await fetch(
//       "https://african-store.onrender.com/api/v1/product", // Remove trailing slash (unless your backend requires it)
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`, // Remove Content-Type (not needed for GET requests)
//         },
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       const products = data.data; // Assuming array is in data.data

//       const filteredProducts = products.filter(
//         (product) => product.name !== "Colos"
//       );

//       filteredProducts.forEach((product) => {
//         const tr = document.createElement("tr");

//         tr.setAttribute("data-id", product._id);
//         tr.innerHTML = `
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <input type="checkbox" class="rounded text-blue-600">
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="flex items-center gap-3">
//                         <img src=${product.file[0]} alt="${product.name}"
//                             class="w-10 h-10 rounded-lg object-cover">
//                         <div>
//                             <div class="font-medium text-gray-900">${
//                               product.name
//                             }</div>
//                             <div class="text-sm text-gray-500">#${
//                               product._id
//                             }</div>
//                             <div class="text-xs text-gray-400">${
//                               product.Variants
//                             }</div>
//                         </div>
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${product.category?.name || "Uncategorized"}
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${product.StockQuantity} units
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ₤${product.BasePrice.toFixed(2)}
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           product.StockQuantity > 0
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }">
//                         ${
//                           product.StockQuantity > 0
//                             ? "In Stock"
//                             : "Out of Stock"
//                         }
//                     </span>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div class="flex gap-2">
//                         <button class="text-gray-400 hover:text-gray-600">
//                             <i class="ri-pencil-line"></i>
//                         </button>
//                         <button class="text-gray-400 hover:text-gray-600">
//                             <i class="ri-delete-bin-line"></i>
//                         </button>
//                     </div>
//                 </td>
//             `;

//         productList.appendChild(tr);
//       });
//     } else {
//       console.error("Failed to fetch products:", response.status);
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// })();

(async function fetchProductList() {
  try {
    const response = await fetch(
      "https://african-store.onrender.com/api/v1/product",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      const products = data.data;

      products.forEach((product) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", product._id);
        tr.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap">
                     <input type="checkbox" class="rounded text-blue-600">
                 </td>
                 <td class="px-6 py-4 whitespace-nowrap">
                     <div class="flex items-center gap-3">
                         <img src=${product.file[0]} alt="${product.name}"
                             class="w-10 h-10 rounded-lg object-cover">
                         <div>
                             <div class="font-medium text-gray-900">${
                               product.name
                             }</div>
                            <div class="text-sm text-gray-500">#${
                              product._id
                            }</div>
                            <div class="text-xs text-gray-400">${
                              product.Variants
                            }</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.category?.name || "Uncategorized"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.StockQuantity} units
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₤${product.BasePrice.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          product.StockQuantity > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }">
                        ${
                          product.StockQuantity > 0
                            ? "In Stock"
                            : "Out of Stock"
                        }
                    </span>
                </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex gap-2">
                   <button class="edit-btn text-gray-400 hover:text-gray-600" data-id="${
                     product._id
                   }">
                <i class="ri-pencil-line"></i>
            </button>
                  <button class="delete-btn text-gray-400 hover:text-gray-600">
                      <i class="ri-delete-bin-line"></i>
                  </button>
              </div>
          </td>
        `;

        // Add delete event listener to each row's delete button
        const editBtn = tr.querySelector(".edit-btn");
        editBtn.addEventListener("click", (e) => {
          const productId = e.currentTarget.dataset.id;
          window.location.href = `add-product.html?id=${productId}`;
        });

        const deleteBtn = tr.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const productId = tr.dataset.id;

          // SweetAlert Confirmation Dialog
          const confirmResult = await Swal.fire({
            title: "Delete Product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });

          if (confirmResult.isConfirmed) {
            try {
              // Show loading spinner
              Swal.fire({
                title: "Deleting...",
                html: "Please wait while we remove the product",
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              });

              const deleteResponse = await fetch(
                `https://african-store.onrender.com/api/v1/product/${productId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // Close loading spinner
              Swal.close();

              if (deleteResponse.ok) {
                tr.remove();
                Swal.fire({
                  title: "Deleted!",
                  text: "Product has been deleted.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                const errorData = await deleteResponse.json();
                Swal.fire({
                  title: "Error!",
                  text: errorData.message || "Failed to delete product",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text: "Network error occurred. Please try again.",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
              });
              console.error("Delete error:", error);
            }
          }
        });

        // ... (rest of the code remains the same)
        productList.appendChild(tr);
      });
    } else {
      console.error("Failed to fetch products:", response.status);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
})();
