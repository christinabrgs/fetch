
const baseURL = 'http://localhost:5000/dogs'


export const fetchSaved = async (): Promise<string[] | null> => {
    try {
        const response = await fetch(`${baseURL}/matched`, {
            method: 'GET'
        })

        const data = await response.json()

        return data.matchedDogs

    } catch (err) {
        console.error('Error fetching saved dogs', err)
        return null
    }
}

export const saveDog = async (dogId: string): Promise<void> => {
    try {
        const response = await fetch(`${baseURL}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dogId }),
        });

        if (response) {
            console.log(response)
        }

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