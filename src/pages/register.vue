<template>
  <!-- <div class="min-h-screen flex items-center h-screen justify-center overflow-y-auto bg-gray-100" style="height: 92vh;">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/3  ">
      <h2 class="text-2xl font-semibold mb-4">Inscription </h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">Nom :</label>
          <input class="border rounded-md py-2 px-3 w-full" type="text" id="last_name" name="last_name"
            placeholder="Votre nom" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="first_name">Prénom :</label>
          <input class="border rounded-md py-2 px-3 w-full" type="text" id="first_name" name="first_name"
            placeholder="Votre prénom" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email :</label>
          <input class="border rounded-md py-2 px-3 w-full" type="email" id="email" name="email"
            placeholder="Votre email" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
          <input class="border rounded-md py-2 px-3 w-full" type="password" id="password" name="password"
            placeholder="Votre mot de passe" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Confirmer le mot de passe :</label>
          <input class="border rounded-md py-2 px-3 w-full" type="password" id="password2" name="password2"
            placeholder="Confirmer le mot de passe" />
        </div>
        <div class="text-center">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full" type="submit">
            S'inscrire
          </button>
        </div>
        <p v-if="pending">Fetching...</p>

      </form>
    </div>
  </div> -->
</template>

<!-- <script setup>
const param1 = ref('value1')

const submit = async () => {
  const { data, pending, error, refresh } = await useFetch(`${apiBaseURL}/register`, {
    method: 'POST',
    // mode:'no-cors',
    headers: {
      Accept: "*/*",
      "Content-type": "application/json",

    },
    body: {
      // first_name: "wilfried",
      // last_name: "Goeh",
      email: "einswilligoeh@gmail.com",
      password: "L0ve#.Py"
    }
  
  })

  console.log('====================================');
  console.log(data.value.data);
  console.log('====================================');

}

</script> -->