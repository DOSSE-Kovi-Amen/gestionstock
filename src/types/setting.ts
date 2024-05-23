// types.ts
export interface Setting {
    id: string;
    societyName: string;
    societyLogo: string | null;
    societyEmail: string ;
    societyContact: string;
    societyDescription: string;
    currency: string;
    created_at: string;
    updated_at: string;
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
  
  