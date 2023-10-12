import { useState } from "react"
import SearchIcon from "../assets/icons/search.svg"
import CausesList from "../assets/causeslist.json"
import { useDispatch } from "react-redux"
import { fetchCharitiesList } from "../features/charity/charitySlice"
import { AppDispatch } from "../app/store"
interface SuggestionProps {
  suggestions: string[]
}
const Searchbar = () => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const dispatch = useDispatch<AppDispatch>()

  //   const [suggestionOpen, setSuggestionOpen] = useState(false)
  const onSearchClick = () => {
    dispatch(fetchCharitiesList(query))
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value
    setQuery(value)

    const filteredSuggestions: string[] = CausesList.causes.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    )

    setSuggestions(filteredSuggestions)
  }

  const selectedSuggestion = (value: string) => {
    setQuery(value)
    setSuggestions([])
  }
  const suggestionOpen = query.length > 0 && suggestions.length > 0

  return (
    <div className="bg-white flex flex-col h-12 w-4/5 md:w-1/2 px-4 py-2 outline-none rounded-xl">
      {/* create a search bar */}
      <div className="justify-between flex flex-row h-full">
        <input
          className="h-full w-full outline-none"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search the charity by causes"
        ></input>

        <img
          onClick={onSearchClick}
          className=" cursor-pointer"
          src={SearchIcon}
          alt="search icon"
        />
      </div>
      <div
        className={`${suggestionOpen ? "flex" : "hidden"} relative w-full mt-4`}
      >
        <div className="flex absolute overflow-scroll bg-white h-24 flex-col w-full px-4 rounded-xl">
          {suggestions.map((cause) => {
            return (
              <div
                key={cause}
                onClick={() => selectedSuggestion(cause)}
                className="text-sm hover:bg-gray-200 cursor-pointer font-mono"
              >
                {cause}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Searchbar
