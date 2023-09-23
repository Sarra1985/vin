import Axios from "axios";

export function getAllWines() {
    return Axios.get("http://localhost:8000/wines").then((res) => res.data);
}
