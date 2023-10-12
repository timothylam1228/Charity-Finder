import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../app/store"
import { Charity } from "../../features/charity/charitySlice"
import {
  add,
  favouriteCharities,
  remove,
} from "../../features/charity/favouriteCharitySlice"

const CharityDetail = (charity: Charity) => {
  const dispatch = useDispatch<AppDispatch>()

  const favouritedCharities = useSelector(favouriteCharities)
  const handleTagClick = (link: string) => {
    window.open(`${link}`, "_blank")
  }

  const addToFavourites = () => {
    // check if charity is already in favourites
    // if yes, remove from favourites
    // if no, add to favourites

    const isFavourited = favouritedCharities.find(
      (item: Charity) => item.primarySlug === charity.primarySlug,
    )
    if (!isFavourited) {
      dispatch(add(charity))
      return
    } else {
      if (charity.primarySlug) {
        dispatch(remove(charity.primarySlug))
      } else {
        dispatch(remove(charity.slug))
      }
    }
  }
  const isFavourited = favouritedCharities.find(
    (item: Charity) => item.primarySlug === charity.primarySlug,
  )
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between pt-12">
          <h2 className=" font-bold text-4xl">{charity.name}</h2>
          <div className="flex items-center md:pl-5 my-4 md:my-0 ">
            {!isFavourited ? (
              <div
                onClick={addToFavourites}
                className="border-2 items-center border-red-400 cursor-pointer flex hover:bg-red-400 w-fit text-red-400 hover:text-white bg-white rounded-full"
              >
                <div className="flex px-2">{`Add to favourite`}</div>
              </div>
            ) : (
              <div
                onClick={addToFavourites}
                className="border-2 items-center border-red-400  cursor-pointer flex hover:bg-red-400 w-fit text-red-400 hover:text-white bg-white rounded-full"
              >
                <div className="flex px-2">{`Remove from favourite`}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col-reverse justify-between">
          <div className="flex flex-col w-full md:w-4/5">
            {charity.descriptionLong
              ? charity.descriptionLong
              : charity.description}
            <a className=" font-medium text-blue-500" href={charity.profileUrl}>
              {`Read More >`}
            </a>
            <code>{charity.locationAddress}</code>
          </div>
          <div className="flex w-full md:w-1/5">
            {charity.logoUrl && (
              <img
                className=" aspect-auto"
                src={charity.logoUrl}
                alt="charity logo"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-fit flex-wrap gap-2">
        {charity.nonprofitTags?.map((tag) => {
          return (
            <div className="flex mt-2" key={tag.id}>
              <div
                className="px-4 py-1 flex rounded-lg border-2 border-black bg-white cursor-pointer hover:bg-black text-black hover:text-white"
                onClick={() => handleTagClick(tag.tagUrl)}
              >
                {tag.title}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default CharityDetail
