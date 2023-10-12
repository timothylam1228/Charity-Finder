import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CharatiesState, AppThunk, RootState } from "../../app/store"
import { fetchCharities, fetchCharityById } from "./charityAPI"
import { useEffect } from "react"
import { Root } from "postcss"

interface Tag {
  id: string
  tagName: string
  title: string
  tagUrl: string
}
export interface Charity {
  name: string
  description: string
  descriptionLong?: string
  ein: string
  profileUrl: string
  logoUrl: string
  coverImageUrl: string
  logoCloudinaryId: string
  matchedTerms: string[]
  slug: string
  location: string
  tags: string[]
  locationAddress?: string
  locationLatLng?: {
    type: string
    coordinates: number[]
  }
  nonprofitTags?: Tag[]
  primarySlug?: string
}

export interface CharityState {
  selectedCharity: Charity | null
  charities: Charity[]
  status: "idle" | "loading" | "failed"
}

const initialCharityState: CharityState = {
  selectedCharity: null,
  charities: [],
  status: "idle",
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchCharitiesList = createAsyncThunk(
  "charity/fetchCharities",
  async (cause: string) => {
    try {
      // Fetch charities from your API or data source
      const response = await fetchCharities(cause) // Adjust the API endpoint as needed
      if (!response) {
        throw new Error("Network response was not ok")
      }
      //   const data = await response.json()
      return response // Assuming response.data is an array of charities
    } catch (error) {
      return Promise.reject(error) // Properly reject the Promise with the error
    }
  },
)
export const fetchCharity = createAsyncThunk(
  "charity/fetchCharityById",
  async (id: string) => {
    try {
      const response = await fetchCharityById(id)
      if (!response) {
        throw new Error("Network response was not ok")
      }
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  },
)

export const charityList = (state: RootState) => state.charityReducer.charities
export const selectedCharity = (state: RootState) =>
  state.charityReducer.selectedCharity

export const charitySlice = createSlice({
  name: "charity",
  initialState: initialCharityState,
  reducers: {
    // Add reducers for managing charity data, e.g., adding, updating, or deleting charities.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharitiesList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCharitiesList.fulfilled, (state, action) => {
        state.status = "idle"
        state.charities = action.payload // Assuming action.payload is an array of charities
      })
      .addCase(fetchCharitiesList.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(fetchCharity.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCharity.fulfilled, (state, action) => {
        state.status = "idle"
        state.selectedCharity = action.payload // Assuming action.payload is an array of charities
      })
      .addCase(fetchCharity.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export default charitySlice.reducer
