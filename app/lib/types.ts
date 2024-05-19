export type Patient = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Note = {
  id: string;
  patient_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};