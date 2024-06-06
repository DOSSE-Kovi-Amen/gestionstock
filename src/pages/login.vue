<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/3">
      <h2 class="text-2xl font-semibold mb-4">Connexion</h2>
      <form @submit.prevent="signin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="emailOrUsername">Email :</label>
          <input v-model="user.login" class="border rounded-md py-2 px-3 w-full" type="text"
            id="emailOrUsername" name="emailOrUsername" placeholder="Votre email ou pseudo" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Mot de passe :</label>
          <input v-model="user.password" class="border rounded-md py-2 px-3 w-full" type="password" id="password"
            name="password" placeholder="Votre mot de passe" required />
        </div>
        <div class="flex justify-center text-center">
          <button v-if="!auth.loading" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
            type="submit">
            Connexion
          </button>
          <Spinner class="h-8" v-else />

        </div>
        <p  v-for="(error, index) in auth.errors" :key="index" class="text-red-500 text-center mt-1">{{ error }}</p>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

const user = {
  login: "",
  password: ""
}

const error: Ref<string> = ref("");

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

// Vérifiez si le paramètre de requête 'sessionExpired' est présent

onMounted(() => {
  const sessionExpired = route.query.sessionExpired === 'true';

  // Utilisez 'sessionExpired' pour afficher le message approprié dans votre interface utilisateur
  // if (sessionExpired) {
  //   // Affichez le message d'erreur, par exemple, en utilisant une variable dans votre template
  //   alert("Votre session a expiré !")
  // }
})
const signin = async () => {
  let creds: any = {}
  if (user.login != "" && user.password != "") {

      creds = { login: user.login, password: user.password }
    
    // Send data to api
    auth.signin(creds).then((status) => {
      if (status) {
        // router.replace("/");
        window.location.href='/';
      } else {
        // error.value = validation.invalidCreds
      }
    })
  } else {
    // error.value = validation.required
  }
};

</script>