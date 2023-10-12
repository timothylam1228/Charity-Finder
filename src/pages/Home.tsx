import CharityList from "../components/Charity/CharityList"
import Searchbar from "../components/Searchbar"

const Home = () => {
  return (
    <>
      <div className=" h-[70vh] bg-green-100">
        <div
          id="search-bar-container"
          className="flex flex-col justify-center items-center h-full"
        >
          <h1>Search the charity by causes</h1>
          <Searchbar />
        </div>
      </div>
      <div className="h-full bg-green-300 w-full md:px-12">
        <CharityList />
      </div>
    </>
  )
}
export default Home
