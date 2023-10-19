<template>
  <div>
    <div>
      <button
        to="sales/create"
        class="py-2 mr-4 p-4 shadow-xl bg-blue-400 hover:bg-blue-500 my-4 text-white"
      >
        <i class="fa-solid fa-check"></i> Tout sélectionner
      </button>
      <button
        to="sales/create"
        class="py-2 p-4 shadow-xl bg-red-500 hover:bg-red-600 my-4 text-white"
      >
        <i class="fa-solid fa-trash"></i> Tout supprimer
      </button>
    </div>
    <div class="bg-purple-200 border-l-4 border-purple-500 p-4 my-2">
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3"
      >
        <div>Ht:</div>
        <div>TTC:</div>
        <div>Reliquat:</div>
        <div>Dette:</div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3"
    >
      <!-- Première carte (1/4 de l'écran sur les écrans larges) -->
      <div class="bg-blue-400 p-4 lg:col-span-1">
        <div class="mb-4">
          <label for="product" class="block text-white mb-2"
            >Ajouter produit:
          </label>
          <select
            v-model="products"
            name="product"
            id="product"
            class="bg-white border rounded w-full text-gray-700 py-2 pl-3 pr-10 focus:outline-none focus:border-blue-500"
            required
            v-on:change="onChooseProduct()"
          >
            <option value="" disabled selected>Sélectionnez</option>
            <option
              v-for="(product, index) in store.products"
              :key="index"
              :value="product"
            >
              {{
                product.name + "(Prix d'achat: " + product.purchase_price + ")"
              }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-white mb-2" for="quantity">Remise:</label>
          <input
            class="border rounded-md py-2 px-3 w-full"
            type="text"
            id="quantity"
            name="quantity"
            placeholder="Quantité"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-white mb-2" for="quantity"
            >Montant reçu:</label
          >
          <input
            class="border rounded-md py-2 px-3 w-full"
            type="text"
            id="quantity"
            name="quantity"
            placeholder="Montant reçu"
            required
          />
        </div>
      </div>

      <!-- Deuxième carte (3/4 de l'écran sur les écrans larges) -->
      <div class="lg:col-span-3">
        <!-- Liste des users -->
        <table
          class="shadow-lg w-full table-hover bg-black bg-opacity-70 text-white"
        >
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-sm">Produit</th>
              <th class="px-6 py-3 text-left text-sm">Prix unitaire</th>
              <th class="px-6 py-3 text-left text-sm">Stock restant</th>
              <th class="px-6 py-3 text-left text-sm">Qté</th>
              <th class="px-6 py-3 text-left text-sm">Montant</th>
            </tr>
          </thead>
          <tbody class="bg-white text-gray-600 divide-y divide-gray-200">
            <tr v-for="(product, index) in formData.products" :key="index">
              <td class="px-6 py-4 whitespace-no-wrap">{{ product.name }}</td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <input type="number" v-model="formData">
                {{ product.selling_price }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {{ product.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {{ product.totalAmount }}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                {{ product.discount }}
              </td>

              <!-- <td class="flex gap-2">
                  <a class="p-0.5 px-2 text-white  bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'read')">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <a class="p-0.5 px-2 text-white  bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'edit')">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </a>
                  <a class="p-0.5 px-2 text-white  bg-red-500 hover:bg-red-600 shadow-xl rounded-sm"
                    @click="openModal(sale, 'delete')">
                    <i class="fa-regular fa-trash-can"></i>
                  </a>
    
                </td> -->
            </tr>
          </tbody>
        </table>
        <div v-if="!formData.products" class="bg-white w-full p-4 text-center">
          Aucun produit sélectionné
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProductsStore } from "~/stores/productsStore";
import { Product, SaleForm } from "~/types";

const store = useProductsStore();
const products = ref<Product | Product[]>();
const formData = ref<SaleForm>({
  products: null,
});

function onChooseProduct() {
  formData.value.products.push(products.value);
}

definePageMeta({
  layout: "main",
});
</script>
