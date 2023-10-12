import { useDispatch, useSelector } from "react-redux"
import { Charity, charityList } from "../../features/charity/charitySlice"
import { favouriteCharities } from "../../features/charity/favouriteCharitySlice"
import { useAppSelector, useCharatiesSelector } from "../../app/hooks"
import Empty from "../../assets/icons/empty.png"
import Pin from "../../assets/icons/pin.png"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const CharityList = () => {
  const charitiesList = useSelector(charityList)
  const navigate = useNavigate()
  const handleOnClick = (slug: string) => {
    navigate(`/charity/${slug}`)
  }

  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 w-full gap-6 md:gap-6 py-6 md:py-12 px-2 md:px-4">
      {charitiesList?.map((charity: Charity, index: number) => {
        return (
          <div
            key={charity.slug}
            className="flex bg-white px-4 py-6 rounded-lg gap-4 cursor-pointer hover:bg-gray-100 "
            onClick={() => handleOnClick(charity.slug)}
          >
            <div className=" flex w-1/5 items-center justify-center">
              <img
                src={charity.logoUrl ? charity.logoUrl : Empty}
                alt={charity.name}
                className="w-full aspect-square flex"
              ></img>
            </div>
            <div className="flex w-3/5 flex-col justify-between">
              <div>
                <div className="font-bold">{charity.name}</div>
                <div className=" line-clamp-2 font-sans text-sm text-gray-600">
                  {charity.description}
                </div>
              </div>
              <div className="flex items-center gap-2  pt-2 ">
                <img src={Pin} alt="pin" className="w-4 h-4"></img>
                <div className=" line-clamp-1">{charity.location}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CharityList
