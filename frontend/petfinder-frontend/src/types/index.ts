export interface RegisteredPet {
  id: number;
  name: string;
  location: string;
  is_lost: boolean;
  photo_path: string;
}

export interface LostPet {
  id: number;
  location: string;
  photo_path: string;
}
