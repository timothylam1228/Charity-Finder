import { createSlice } from "@reduxjs/toolkit"
import { FavouriteCharatiesState, RootState } from "../../app/store"
import { Charity } from "./charitySlice"
// export interface Charity {
//   name: string
//   description: string
//   ein: string
//   profileUrl: string
//   logoUrl: string
//   coverImageUrl: string
//   logoCloudinaryId: string
//   matchedTerms: string[]
//   slug: string
//   location: string
//   tags: string[]
// }

export interface FavouritesCharityState {
  favouriteCharities: Charity[]
  status: "idle" | "loading" | "failed"
}

const initialCharityState: FavouritesCharityState = {
  favouriteCharities: [],
  status: "idle",
}

export const favouriteCharitySlice = createSlice({
  name: "charity",
  initialState: initialCharityState,
  reducers: {
    // Add reducers for managing charity data, e.g., adding, updating, or deleting charities.
    add: (state, action: { payload: Charity }) => {
      state.favouriteCharities.push(action.payload)
    },
    remove: (state, action: { payload: string }) => {
      state.favouriteCharities = state.favouriteCharities.filter(
        (charity) => charity.primarySlug !== action.payload,
      )
    },
  },
})

export const favouriteCharities = (state: RootState) =>
  state.favouriteCharityReducer.favouriteCharities

export const { add, remove } = favouriteCharitySlice.actions

export default favouriteCharitySlice.reducer
