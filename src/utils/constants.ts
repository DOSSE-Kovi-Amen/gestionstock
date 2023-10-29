import { Timestamp } from "firebase/firestore";

// Export the api baseURL
const prod = false;
export const apiBaseURL = prod ? 'https://...' : 'http://localhost:4000';

export const frenchDate=(dateStr:string)=> {
  const options :any= { year: 'numeric', month: 'long', day: 'numeric' };
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


export const getFieldFromPointer=(pointer:any)=> {
  // Cette méthode extrait le nom du champ de la chaîne pointer
  const parts = pointer.split('/');
  return parts[parts.length - 1];
}
export function isValidEmail(email:string) {
  // Modèle d'adresse email valide à l'aide d'une regex
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Utilisation de la méthode test() pour vérifier si l'adresse email correspond au modèle
  return emailPattern.test(email);
}


