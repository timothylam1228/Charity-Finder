import { Charity } from "./charitySlice"

export function fetchCharities(cause: string) {
  const apiKey = import.meta.env.VITE_API_KEY
  // Replace with your actual API key
  const apiUrl = `https://partners.every.org/v0.2/search/`
  return new Promise<Charity[]>((resolve, reject) => {
    fetch(apiUrl + cause + "?apiKey=" + apiKey)
      .then((response) => {
        if (!response.ok) {
          reject(`Request failed with status: ${response.status}`)
        }
        return response.json() // Parse the response as JSON
      })
      .then((data) => {
        // Assuming the response data has a 'nonprofit' property containing an array of charities
        const charities: Charity[] = data.nonprofits
        resolve(charities)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function fetchCharityById(id: string) {
  const apiKey = "pk_live_ee9b178da30815fee8e5aa071cd8d2f1" // Replace with your actual API key
  const apiUrl = `https://partners.every.org/v0.2/nonprofit/`
  return new Promise<Charity>((resolve, reject) => {
    fetch(apiUrl + id + "?apiKey=" + apiKey)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }
        return response.json() // Parse the response as JSON
      })
      .then((data) => {
        // Assuming the response data has a 'nonprofit' property containing an array of charities
        const charity: Charity = data.data.nonprofit
        charity.nonprofitTags = data.data.nonprofitTags
        resolve(charity)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
