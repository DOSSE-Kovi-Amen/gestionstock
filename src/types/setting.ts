// types.ts
export interface Setting {
    id: string;
    society_name: string;
    society_logo: string;
    society_email: string ;
    society_contact: string;
    society_description: string;
    currency: string;
    created_at: string;
    updated_at: string;
  }

  // types.ts
export interface SettingForm {
  society_name: string;
  society_logo: string|null;
  society_email: string ;
  society_contact: string;
  society_description: string;
  currency: string;
}
  
  