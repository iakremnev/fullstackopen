// Google Maps Weather API
import axios from 'axios'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const BASE_URL = 'https://weather.googleapis.com/v1'


const getCurrentConditions = ({ latitude, longitude }) => {
    const params = {
        'key': GOOGLE_MAPS_API_KEY,
        'location.latitude': latitude,
        'location.longitude': longitude
    }
    const response = axios.get(`${BASE_URL}/currentConditions:lookup`, { params })
    return response.then(response => response.data)
}

export default { getCurrentConditions }
