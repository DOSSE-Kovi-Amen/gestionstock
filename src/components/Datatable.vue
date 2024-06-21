<template>
  <div class="overflow-x-auto">
    <table id="myTable" class="w-full table-hover table-head text-white">
      <slot />
    </table>
  </div>
</template>


<script setup lang="ts">
import $ from "jquery";
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-bs5';
import 'datatables.net-select-bs5';
let table: any = null;
onMounted(() => {
  table = $('#myTable').DataTable({
    "ordering": false, // Désactive le tri

    dom: 'Blfrtip',
    buttons: [
      {
        extend: 'csv',
        className: 'btn-primary py-1 p-2 text-white rounded-lg', // Assurez-vous que la classe est correcte
      },
      {
        extend: 'print',
        className: 'bg-black py-1 p-2 text-white rounded-lg', // Assurez-vous que la classe est correcte
        text: 'Imprimer', // Texte en français

      },
      'excel', 'pdf', {
        className: 'custom-button', // Assurez-vous que la classe est correcte
      },
    ],
    language: {
    paginate: {
      next: 'Suivant', // Personnalisez le bouton Next
      previous: 'Précédent', // Personnalisez le bouton Previous
    },
    search:'Rechercher:',
    searchPlaceholder:'Rechercher',
    info: 'Affichage de _START_ à _END_ sur _TOTAL_ entrées', // Personnalisez ce texte
    lengthMenu: 'Afficher _MENU_ entrées', // Personnaliser le texte pour le menu déroulant

  },
    // select: true,
    // responsive: true,
    pageLength: 10, // Nombre de lignes par page
  });
  
})
onUnmounted(() => table.destroy());
</script>

<style>
.page-link{
  color: rgb(253, 253, 253) !important;
}
.form-select{
}
.paginate_button ,.page-item, .active{
  background-color: rgb(75, 75, 75)!important;
  border-radius: 5px !important;
}
.paginate_button:hover ,.page-item:hover, .active{
  background-color: rgb(0, 0, 0)!important;
  border-radius: 5px !important;
  color: white !important;
}

input[type="search"] {
  background-color: white !important ;
  margin-bottom: 10px;
}
</style>