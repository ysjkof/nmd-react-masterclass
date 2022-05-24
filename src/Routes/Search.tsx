import { useLocation } from "react-router-dom";

function Search() {
  const locate = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}

export default Search;
