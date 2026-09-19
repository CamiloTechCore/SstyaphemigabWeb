import MediaCarousel from './MediaCarousel'
import generatedImage from '../assets/carousel/Gemini_Generated_Image_q41en8q41en8q41e.jpg'
import emergencyVideo from '../assets/carousel/Grabación 2026-09-14 154752.mp4'
import serviceImageOne from '../assets/carousel/WhatsApp Image 2026-09-09 at 12.26.48 PM.jpeg'
import serviceImageTwo from '../assets/carousel/WhatsApp Image 2026-09-09 at 12.26.49 PM.jpeg'

const MEDIA_ITEMS = [
  { url: serviceImageOne, type: 'image', title: 'Servicios SST y APH' },
  { url: serviceImageTwo, type: 'image', title: 'Información de servicios' },
  { url: generatedImage, type: 'image', title: 'Imagen destacada' },
  { url: emergencyVideo, type: 'video', title: 'Video de atención y prevención' },
]

function HomeMediaCarousel() {
  return <MediaCarousel media={MEDIA_ITEMS} />
}

export default HomeMediaCarousel
