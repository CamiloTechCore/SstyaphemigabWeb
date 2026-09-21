import MediaCarousel from './MediaCarousel'
import generatedImage from '../assets/carousel/Imagen_APH_1.jpeg'
import serviceImageThree from '../assets/carousel/Imagen_APH_2.jpeg'
import serviceImageOne from '../assets/carousel/Imagen_APH_3.jpeg'
import serviceImageTwo from '../assets/carousel/Imagen_APH_5.jpeg'
import serviceImageFour from '../assets/carousel/Imagen_APH_4.jpeg'
import serviceImageFive from '../assets/carousel/Imagen_Logistic_1.jpeg'
import serviceImageSix from '../assets/carousel/Imagen_Logistic_2.jpeg'
import serviceImageSeven from '../assets/carousel/Imagen_Logistic_3.jpeg'



const MEDIA_ITEMS = [
  { url: serviceImageOne, type: 'image', title: 'Servicios SST y APH' },
  { url: serviceImageTwo, type: 'image', title: 'Información de servicios' },
  { url: generatedImage, type: 'image', title: 'Imagen destacada' },
  { url: serviceImageThree, type: 'image', title: 'Imagen de capacitación' },
  { url: serviceImageFour, type: 'image', title: 'Imagen de capacitación adicional' },
  { url: serviceImageFive, type: 'image', title: 'Imagen de logística 1' },
  { url: serviceImageSix, type: 'image', title: 'Imagen de logística 2' },
  { url: serviceImageSeven, type: 'image', title: 'Imagen de logística 3' },
]

function HomeMediaCarousel() {
  return <MediaCarousel media={MEDIA_ITEMS} />
}

export default HomeMediaCarousel
