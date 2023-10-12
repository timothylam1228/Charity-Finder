import { useEffect } from "react"
import CharityList from "../components/Charity/CharityList"
import Searchbar from "../components/Searchbar"
import causes from "../assets/causeslist.json"
import { useDispatch } from "react-redux"
import { fetchCharitiesList } from "../features/charity/charitySlice"
import { AppDispatch } from "../app/store"

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    // pick a random cause from the list
    const randomCause =
      causes.causes[Math.floor(Math.random() * causes.causes.length)]

    dispatch(fetchCharitiesList(randomCause))
  }, [])
  return (
    <>
      <div className=" h-[70vh] bg-hero bg-cover">
        <div
          id="search-bar-container"
          className="flex flex-col justify-center items-center h-full "
        >
          <Searchbar />
        </div>
      </div>
      <div className="h-full bg-gray-200 w-full md:px-12">
        <CharityList />
      </div>
    </>
  )
}
export default Home
