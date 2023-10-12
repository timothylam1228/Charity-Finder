import { useSelector } from "react-redux"
import { favouriteCharities } from "../features/charity/favouriteCharitySlice"
import CharityDetail from "../components/Charity/CharityDetail"
import Container from "../components/Layout/Container"
const Favorite = () => {
  const charities = useSelector(favouriteCharities)
  return (
    <Container>
      <div className="flex flex-col w-full">
        {charities && charities.length > 0 ? (
          charities.map((charity, index) => {
            return (
              <div
                key={`${charity.slug}-${index}`}
                className="flex flex-col w-full"
              >
                <CharityDetail {...charity} />
              </div>
            )
          })
        ) : (
          <div className="flex justify-center h-[80vh] w-full items-center">
            <div>no favourite charity</div>
          </div>
        )}
      </div>
    </Container>
  )
}
export default Favorite
