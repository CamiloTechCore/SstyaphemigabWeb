import MediaCarousel from './MediaCarousel'
import generatedImage from '../assets/carousel/Imagen_APH_1.jpeg'
import serviceImageThree from '../assets/carousel/Imagen_APH_2.jpeg'
import serviceImageOne from '../assets/carousel/Imagen_APH_3.jpeg'
import serviceImageTwo from '../assets/carousel/Imagen_APH_5.jpeg'
import serviceImageFour from '../assets/carousel/Imagen_APH_4.jpeg'


const MEDIA_ITEMS = [
  { url: serviceImageOne, type: 'image', title: 'Servicios SST y APH' },
  { url: serviceImageTwo, type: 'image', title: 'Información de servicios' },
  { url: generatedImage, type: 'image', title: 'Imagen destacada' },
  { url: serviceImageThree, type: 'image', title: 'Imagen de capacitación' },
  { url: serviceImageFour, type: 'image', title: 'Imagen de capacitación adicional' },
]

function HomeMediaCarousel() {
  return <MediaCarousel media={MEDIA_ITEMS} />
}

export default HomeMediaCarousel
