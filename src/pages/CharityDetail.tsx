import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCharity } from "../features/charity/charitySlice"
import { AppDispatch } from "../app/store"
import { useAppSelector } from "../app/hooks"
import { selectedCharity } from "../features/charity/charitySlice"
import CharityDetail from "../components/Charity/CharityDetail"
import Container from "../components/Layout/Container"
const CharityDetailPage = () => {
  let { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const charity = useSelector(selectedCharity)

  useEffect(() => {
    if (!id) return
    dispatch(fetchCharity(id))
  }, [])

  if (charity === null) return <div>loading...</div>
  return (
    <div>
      <Container>
        <CharityDetail {...charity} />
      </Container>
    </div>
  )
}
export default CharityDetailPage
