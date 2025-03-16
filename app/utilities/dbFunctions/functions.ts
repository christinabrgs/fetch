
const baseURL = 'http://localhost:5000/dogs'


export const fetchSaved = async (): Promise<string[] | null> => {
    try {
        const response = await fetch(`${baseURL}/matched`)

        const { savedDogs }: { savedDogs: string[] } = await response.json()

        return savedDogs

    } catch (err) {
        console.error('Error fetching saved dogs', err)
        return null
    }
}

export const saveDog = async (dogId: string): Promise<void> => {
    try {
        await fetch(`${baseURL}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dogId }),
        });
    } catch (error) {
        console.error("Error saving dog:", error);
    }
}


export const removeDog = async (dogId: string): Promise<void> => {
    try {
      await fetch(`${baseURL}/remove/${dogId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing dog:", error);
    }
  };