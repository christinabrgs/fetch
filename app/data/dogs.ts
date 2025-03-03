
export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}


export interface DogSearchParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: number;
    sort?: string;
    cursor?: string;
  }

  export interface SearchResponse {
    resultIds: string[]; 
    total: number;
    next?: string;
    prev?: string;
  }
  

  export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
  }


const dogs: Dog[] = [
    {
        id: "1",
        img: "https://placedog.net/300/200?id=1",
        name: "Buddy",
        age: 3,
        zip_code: "90210",
        breed: "Golden Retriever"
    },
    {
        id: "2",
        img: "https://placedog.net/300/200?id=2",
        name: "Luna",
        age: 2,
        zip_code: "10001",
        breed: "Labrador Retriever"
    },
    {
        id: "3",
        img: "https://placedog.net/300/200?id=3",
        name: "Charlie",
        age: 4,
        zip_code: "60614",
        breed: "Beagle"
    },
    {
        id: "4",
        img: "https://placedog.net/300/200?id=4",
        name: "Daisy",
        age: 1,
        zip_code: "30301",
        breed: "French Bulldog"
    },
    {
        id: "5",
        img: "https://placedog.net/300/200?id=5",
        name: "Max",
        age: 5,
        zip_code: "73301",
        breed: "German Shepherd"
    }
];

export default dogs;
