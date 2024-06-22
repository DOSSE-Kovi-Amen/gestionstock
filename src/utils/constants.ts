
// Export the api baseURL
const prod = false;
export const baseURL = prod ? 'https://...' : 'http://127.0.0.1:8000';

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

// export function formatDateFrench(timestamp:Timestamp) {
//   // Convertir le timestamp en une date JavaScript
//   const date = timestamp.toDate();

//   // Options de formatage pour la date
//   const optionsDate:any = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   };

//   // Options de formatage pour l'heure
//   const optionsHeure:any = {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//   };

//   // Formater la date en utilisant les options
//   const dateFormatee = date.toLocaleDateString('fr-FR', optionsDate);
//   const heureFormatee = date.toLocaleTimeString('fr-FR', optionsHeure);

//   // Retourner la date et l'heure formatées
//   return `${dateFormatee} à ${heureFormatee}`;
// }


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