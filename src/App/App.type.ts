
export interface Image {
  id?: number;
  urls: {
    regular: string;
    small?: string;
  }
  alt_description: string;
  user: {
    name: string;
  }
  likes: number;
  
}

export interface ApiResponce{
  results: Image[];
}