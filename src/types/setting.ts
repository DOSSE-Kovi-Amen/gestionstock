// types.ts
export interface Setting {
    id: string;
    societyName: string;
    societyLogo: string | null;
    societyEmail: string ;
    societyContact: string;
    societyDescription: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
  }

  // types.ts
export interface SettingForm {
    societyName: string;
    societyLogo: string | null;
    societyEmail: string | null;
    societyContact: string;
    societyDescription: string;
    currency: string;
}
  
  