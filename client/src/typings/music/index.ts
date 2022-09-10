export interface AddMusicDto {
  songId: string;
  title: string;
  image: string;
  singer: string;
}

export interface MusicResponseDto {
  album: {
    images: {
      height: number;
      url: string;
      width: number;
    }[];
  };
  name: string;
  artists: {
    name: string;
  }[];
}