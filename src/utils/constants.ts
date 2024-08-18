
// Export the api baseURL
const prod = true;
export const baseURL = prod ? 'https://compute-corner.com' : 'http://127.0.0.1:8000';

export const apiBaseURL = baseURL+'/api';

export const frenchDate = (dateStr: string) => {
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", options);
}
export const getFieldFromPointer = (pointer: any) => {
  // Cette méthode extrait le nom du champ de la chaîne pointer
  const parts = pointer.split('/');
  return parts[parts.length - 1];
}

export function isValidEmail(email: string) {
  // Modèle d'adresse email valide à l'aide d'une regex
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Utilisation de la méthode test() pour vérifier si l'adresse email correspond au modèle
  return emailPattern.test(email);
}

export function  getImageUrl(url:string) {
  // Utilisez l'URL API pour récupérer les images
  return `${baseURL}/storage/${url}`;
}

export function validJSON(data: any) {
  if (typeof data === 'string') {
    return JSON.parse(data);
  } else {
    return data;
  }
}

export function animateCounter(dataCount:number) {
  const counter=ref(0);
  const duration = 1000; // Durée de l'animation en millisecondes
  const fps = 60; // Nombre de trames par seconde
  const increment = Math.ceil(dataCount / (duration / 10000 * fps));
  const interval = setInterval(() => {
    if (counter.value < dataCount) {
      counter.value += increment;
    } else {
      counter.value = dataCount;
      clearInterval(interval);
    }
  }, 150 / fps);

  return counter;
}


export function formatMonetaire(nombre:number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(nombre);
}


export function convertirNombreEnLettres(nombre: number) {
  const unite = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const exceptionDix = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const dizaine = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
  
  if (nombre === 0) return "zéro";

  function enLettres(n: number):any {
    if (n < 10) return unite[n];
    if (n < 20) return exceptionDix[n - 10];
    if (n < 100) {
      let u = n % 10;
      let d = Math.floor(n / 10);
      let liaison = (d === 8 && u > 0) ? "-" : (u === 1 && (d === 1 || d === 7 || d === 9)) ? "-et-" : "-";
      return dizaine[d] + (u ? liaison + unite[u] : "");
    }
    if (n < 1000) {
      let c = Math.floor(n / 100);
      let r = n % 100;
      let cent = c === 1 ? "cent" : unite[c] + "-cents";
      if (r === 0) return cent;
      return cent + (c > 1 ? " " : "-") + enLettres(r);
    }
    if (n < 1000000) {
      let m = Math.floor(n / 1000);
      let r = n % 1000;
      let mille:any = m === 1 ? "mille" : enLettres(m) + " mille";
      if (r === 0) return mille;
      return mille + (r < 100 ? " " : "-") + enLettres(r);
    }
    if (n < 1000000000) {
      let mil = Math.floor(n / 1000000);
      let r = n % 1000000;
      let million:any = mil === 1 ? "un million" : enLettres(mil) + " millions";
      if (r === 0) return million;
      return million + (r < 100 ? " " : " ") + enLettres(r);
    }
    if (n < 1000000000000) {
      let milMil = Math.floor(n / 1000000000);
      let r = n % 1000000000;
      let milliard:any = milMil === 1 ? "un milliard" : enLettres(milMil) + " milliards";
      if (r === 0) return milliard;
      return milliard + (r < 100 ? " " : " ") + enLettres(r);
    }
    if (n < 1000000000000000) {
      let bil = Math.floor(n / 1000000000000);
      let r = n % 1000000000000;
      let billion:any = bil === 1 ? "un billion" : enLettres(bil) + " billions";
      if (r === 0) return billion;
      return billion + (r < 100 ? " " : " ") + enLettres(r);
    }
    return "Nombre trop grand";
  }

  return enLettres(nombre)+ ' F CFA';
}
